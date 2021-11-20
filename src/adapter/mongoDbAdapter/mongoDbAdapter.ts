import { MongoDbRepository } from "../../application/ports/out/MongoDbRepository";
import { injectable } from "tsyringe";
import ContactSchema from "../../config/db/dbModel";
import moment from "moment";
import { Contact } from "../../domain/contact";
import { ContactsResult } from "../../domain/contactResult";

@injectable()
export default class MongoDbAdapter implements MongoDbRepository {
  async getContacts(): Promise<Array<any>> {
    try {
      return await ContactSchema.find({})
        .select(`name lastName number address -_id`)
        .then((res: any) => {
          console.log(
            "Successfull Search at :",
            moment().format("DD/MM/YYYY-hh:mm:ss")
          );
          return res;
        });
    } catch (error) {
      console.log("Failed Search", moment().format());
      throw new Error("Something went wrong searching contacts");
    }
  }

  async createContact(contact: Contact): Promise<ContactsResult> {
    const model = new ContactSchema(contact);

    return await model
      .save()
      .then((doc: any) => {
        if (!doc || doc.length === 0) {
          return Promise.reject(this.response("fail", 400, doc));
        } else {
          return Promise.resolve(
            this.response("Contact created successfully", 201, {
              name: doc.name,
              lastName: doc.lastName,
            })
          );
        }
      })
      .catch((err: any) => {
        return this.response("Bad Request", 400, err.message);
      });
  }

  response(message: String, code: Number, contact: Object): ContactsResult {
    return new ContactsResult(message, code, contact);
  }
}

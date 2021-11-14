import { MongoDbRepository } from "../../application/ports/out/MongoDbRepository";
import { injectable } from "tsyringe";
import ContactSchema from "../../db/dbModel";
import moment from "moment";
import { Contact } from "../../domain/contact";
import { ContactsResult } from "../../domain/contactResult";

@injectable()
export default class MongoDbAdapter implements MongoDbRepository {
  contactsResult: any[];

  getContacts() {
    ContactSchema.find({})
      .select(`name lastName number address -_id`)
      .then((doc) => {
        console.log(
          "Successfull Search at :",
          moment().format("DD/MM/YYYY-hh:mm:ss")
        );
        this.contactsResult = [...doc];
      })
      .catch((err) => {
        console.log("Failed Search", moment().format());
        return err;
      });
    return this.contactsResult;
  }

  createContact(contact: Contact): Promise<ContactsResult> {
    try {
      return Promise.resolve(this.test(contact));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  test(data: any): ContactsResult {
    return new ContactsResult("hola", 201);
  }
}

import { Contact } from "../../../domain/contact";
import { ContactsResult } from "../../../domain/contactResult";

export interface MongoDbRepository {
  getContacts(): Promise<Array<any>>;
  createContact(contact: Contact): Promise<ContactsResult>;
}

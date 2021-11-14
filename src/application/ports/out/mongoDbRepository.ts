import { Contact } from "../../../domain/contact";
import { ContactsResult } from "../../../domain/contactResult";

export interface MongoDbRepository {
  getContacts(): Array<any>;
  createContact(contact: Contact): Promise<ContactsResult>;
}

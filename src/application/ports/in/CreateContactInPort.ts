import { Contact } from "../../../domain/contact";
import { ContactsResult } from "../../../domain/contactResult";

export interface CreateContactInPort {
  executeCreation(contact: Contact): Promise<ContactsResult>;
}

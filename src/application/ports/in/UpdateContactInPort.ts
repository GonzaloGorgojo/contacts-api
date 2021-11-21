import { ContactsResult } from "../../../domain/contactResult";

export interface UpdateContactInPort {
  executeUpdate(req: any): Promise<ContactsResult>;
}

import { ContactsResult } from "../../../domain/contactResult";

export interface DeleteContactInPort {
  executeDelete(req: any): Promise<ContactsResult>;
}

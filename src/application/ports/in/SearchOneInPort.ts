import { ContactsResult } from "../../../domain/contactResult";

export interface SearchOneInPort {
  executeFindOne(req: any): Promise<ContactsResult>;
}

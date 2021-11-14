import { injectable, inject } from "tsyringe";
import { Contact } from "../../domain/contact";
import { ContactsResult } from "../../domain/contactResult";
import { CreateContactInPort } from "../ports/in/CreateContactInPort";
import { MongoDbRepository } from "../ports/out/MongoDbRepository";

@injectable()
export default class CreateContactUseCase implements CreateContactInPort {
  mongoDbRepository: MongoDbRepository;

  constructor(
    @inject("MongoDbRepository") mongoDbRepository: MongoDbRepository
  ) {
    this.mongoDbRepository = mongoDbRepository;
  }

  executeCreation(contact: Contact): Promise<ContactsResult> {
    console.log("caso de uso", contact);
    return this.mongoDbRepository.createContact(contact);
  }
}

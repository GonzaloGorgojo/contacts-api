import { injectable, inject } from "tsyringe";
import { ContactsResult } from "../../domain/contactResult";
import { UpdateContactInPort } from "../ports/in/UpdateContactInPort";
import { MongoDbRepository } from "../ports/out/MongoDbRepository";

@injectable()
export default class UpdateContactUseCase implements UpdateContactInPort {
  mongoDbRepository: MongoDbRepository;

  constructor(
    @inject("MongoDbRepository") mongoDbRepository: MongoDbRepository
  ) {
    this.mongoDbRepository = mongoDbRepository;
  }

  executeUpdate(req: any): Promise<ContactsResult> {
    return this.mongoDbRepository.updateContact(req);
  }
}

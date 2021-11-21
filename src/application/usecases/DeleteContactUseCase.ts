import { injectable, inject } from "tsyringe";
import { ContactsResult } from "../../domain/contactResult";
import { DeleteContactInPort } from "../ports/in/DeleteContactInPort";
import { UpdateContactInPort } from "../ports/in/UpdateContactInPort";
import { MongoDbRepository } from "../ports/out/MongoDbRepository";

@injectable()
export default class DeleteContactUseCase implements DeleteContactInPort {
  mongoDbRepository: MongoDbRepository;

  constructor(
    @inject("MongoDbRepository") mongoDbRepository: MongoDbRepository
  ) {
    this.mongoDbRepository = mongoDbRepository;
  }

  executeDelete(req: any): Promise<ContactsResult> {
    return this.mongoDbRepository.deleteContact(req);
  }
}

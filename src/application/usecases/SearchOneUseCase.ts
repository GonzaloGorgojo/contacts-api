import { injectable, inject } from "tsyringe";
import { MongoDbRepository } from "../ports/out/MongoDbRepository";
import { SearchOneInPort } from "../ports/in/SearchOneInPort";
import { ContactsResult } from "../../domain/contactResult";

@injectable()
export default class SearchOneUseCase implements SearchOneInPort {
  mongoDbRepository: MongoDbRepository;

  constructor(
    @inject("MongoDbRepository") mongoDbRepository: MongoDbRepository
  ) {
    this.mongoDbRepository = mongoDbRepository;
  }

  async executeFindOne(req: any): Promise<ContactsResult> {
    return await this.mongoDbRepository.getOneContact(req);
  }
}

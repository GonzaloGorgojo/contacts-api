import { injectable, inject } from "tsyringe";
import { SearchContactsInPort } from "../ports/in/SearchContactsInPort";
import { MongoDbRepository } from "../ports/out/MongoDbRepository";

@injectable()
export default class SearchContactsUseCase implements SearchContactsInPort {
  mongoDbRepository: MongoDbRepository;

  constructor(
    @inject("MongoDbRepository") mongoDbRepository: MongoDbRepository
  ) {
    this.mongoDbRepository = mongoDbRepository;
  }

  async executeSearch(): Promise<Array<any>> {
    return await this.mongoDbRepository.getContacts();
  }
}

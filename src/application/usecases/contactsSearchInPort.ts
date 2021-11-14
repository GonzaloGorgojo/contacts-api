import { injectable } from "tsyringe";
import { SearchContactsInPort } from "../ports/in/SearchContactsInPort";
import { MongoDbRepository } from "../ports/out/mongoDbRepository";

@injectable()
export default class BookService implements SearchContactsInPort {
  mongoDbRepository: MongoDbRepository;

  constructor(mongoDbRepository: MongoDbRepository) {
    this.mongoDbRepository = mongoDbRepository;
  }

  execute() {
    return this.mongoDbRepository.getBooks();
  }
}

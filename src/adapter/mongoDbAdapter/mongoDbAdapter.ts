import { MongoDbRepository } from "../../application/ports/out/mongoDbRepository";

export default class MongoDbAdapter implements MongoDbRepository {
  books = [
    { id: 1, name: "The Pragmatic Programmer" },
    { id: 2, name: "Poems that Solve Puzzles" },
  ];

  getBooks() {
    return this.books;
  }
}

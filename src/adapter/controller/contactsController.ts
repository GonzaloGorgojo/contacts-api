import { Router } from "express";
import { injectable, inject } from "tsyringe";
import { SearchContactsInPort } from "../../application/ports/in/SearchContactsInPort";

@injectable()
export default class BookController {
  searchContactsInPort: SearchContactsInPort;
  router: Router;

  constructor(
    @inject("SearchContactsInPort") searchContactsInPort: SearchContactsInPort
  ) {
    this.searchContactsInPort = searchContactsInPort;
    this.router = Router();
  }

  getBooksRoute() {
    return this.searchContactsInPort.execute();
  }

  routes() {
    this.router.get("/", (_req, res) => res.send(this.getBooksRoute()));
    return this.router;
  }
}

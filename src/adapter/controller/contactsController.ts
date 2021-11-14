import { Router } from "express";
import { injectable, inject } from "tsyringe";
import { CreateContactInPort } from "../../application/ports/in/CreateContactInPort";
import { SearchContactsInPort } from "../../application/ports/in/SearchContactsInPort";
import { Contact } from "../../domain/contact";

@injectable()
export default class ContactsController {
  router: Router;

  constructor(
    @inject("SearchContactsInPort")
    private readonly searchContactsInPort: SearchContactsInPort,
    @inject("CreateContactInPort")
    private readonly createContactInPort: CreateContactInPort
  ) {
    this.router = Router();
  }

  routes() {
    this.router.get("/contacts", (req, res) =>
      res.send(this.searchContactsInPort.executeSearch())
    );
    this.router.post("/create-contact", (req, res) => {
      console.log(req.body);
      const data = new Contact(
        req.body.name,
        req.body.lastName,
        req.body.number,
        req.body.address
      );
      res.send(this.createContactInPort.executeCreation(data));
    });
    return this.router;
  }
}

import { Router } from "express";
import { injectable, inject } from "tsyringe";
import { CreateContactInPort } from "../../application/ports/in/CreateContactInPort";
import { SearchContactsInPort } from "../../application/ports/in/SearchContactsInPort";
import { Contact } from "../../domain/contact";
import { ContactsControllerModel } from "./model/ContactsControllerModel";

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
    this.router.get("/contacts", (req, res) => {
      return this.searchContactsInPort.executeSearch().then((result: any) => {
        return res.status(200).json(result);
      });
    });

    this.router.post("/create-contact", async (req, res) => {
      const data = new Contact(
        req.body.name,
        req.body.lastName,
        req.body.number,
        req.body.address
      );
      return await this.createContactInPort
        .executeCreation(data)
        .then((result) => {
          return ContactsControllerModel.from(result);
        })
        .then((contactsControllerModel) => {
          console.log("Controller Response: ", contactsControllerModel);
          return res.status(201).json(contactsControllerModel);
        });
    });
    return this.router;
  }
}

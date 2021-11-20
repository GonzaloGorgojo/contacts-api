import { NextFunction, Router } from "express";
import { request } from "http";
import { injectable, inject } from "tsyringe";
import { CreateContactInPort } from "../../application/ports/in/CreateContactInPort";
import { SearchContactsInPort } from "../../application/ports/in/SearchContactsInPort";
import { Contact } from "../../domain/contact";
import { CreateRequestValidatorMiddleware } from "./middleware/ValidateCreationRequest";
import { ContactsControllerModel } from "./model/ContactsControllerModel";

@injectable()
export default class ContactsController {
  router: Router;

  constructor(
    @inject("SearchContactsInPort")
    private readonly searchContactsInPort: SearchContactsInPort,
    @inject("CreateContactInPort")
    private readonly createContactInPort: CreateContactInPort,
    @inject("CreateRequestValidatorMiddleware")
    private readonly validateCreationRequest: CreateRequestValidatorMiddleware
  ) {
    this.router = Router();
  }

  routes() {
    this.router.get("/contacts", (req, res) => {
      return this.searchContactsInPort.executeSearch().then((result: any) => {
        return res.status(200).json(result);
      });
    });

    this.router.post("/create-contact", async (req, res, next) => {
      await this.validateCreationRequest.handleRequest(req, next);
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
          contactsControllerModel.code == 400
            ? res.status(400).json(contactsControllerModel)
            : res.status(201).json(contactsControllerModel);
        });
    });
    return this.router;
  }
}

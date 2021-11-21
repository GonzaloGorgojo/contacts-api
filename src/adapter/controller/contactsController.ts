import { Router } from "express";
import { injectable, inject } from "tsyringe";
import { CreateContactInPort } from "../../application/ports/in/CreateContactInPort";
import { DeleteContactInPort } from "../../application/ports/in/DeleteContactInPort";
import { SearchContactsInPort } from "../../application/ports/in/SearchContactsInPort";
import { SearchOneInPort } from "../../application/ports/in/SearchOneInPort";
import { UpdateContactInPort } from "../../application/ports/in/UpdateContactInPort";
import { Contact } from "../../domain/contact";
import { CreateRequestValidatorMiddleware } from "./middleware/ValidateCreationRequest";
import { ContactsControllerModel } from "./model/ContactsControllerModel";

@injectable()
export default class ContactsController {
  router: Router;

  constructor(
    @inject("SearchContactsInPort")
    private readonly searchContactsInPort: SearchContactsInPort,
    @inject("SearchOneInPort")
    private readonly searchOneInPort: SearchOneInPort,
    @inject("CreateContactInPort")
    private readonly createContactInPort: CreateContactInPort,
    @inject("UpdateContactInPort")
    private readonly updateContactInPort: UpdateContactInPort,
    @inject("DeleteContactInPort")
    private readonly deleteContactInPort: DeleteContactInPort,
    @inject("CreateRequestValidatorMiddleware")
    private readonly validateCreationRequest: CreateRequestValidatorMiddleware
  ) {
    this.router = Router();
  }

  routes() {
    this.router.get("/contacts", async (req, res) => {
      return await this.searchContactsInPort
        .executeSearch()
        .then((result: any) => {
          return res.status(200).json({ contacts: result });
        });
    });

    this.router.get("/contact/:name", async (req, res, next) => {
      return await this.searchOneInPort
        .executeFindOne(req)
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

    this.router.put("/contact/:number", async (req, res, next) => {
      return await this.updateContactInPort
        .executeUpdate(req)
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

    this.router.delete("/contact/:number", async (req, res, next) => {
      return await this.deleteContactInPort
        .executeDelete(req)
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

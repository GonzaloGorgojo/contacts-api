import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db/connect";
import ContactsController from "./adapter/controller/ContactsController";
import SearchContactsUseCase from "./application/usecases/SearchContactUsecase";
import MongoDbAdapter from "./adapter/mongoDbAdapter/MongoDbAdapter";
import CreateContactUseCase from "./application/usecases/CreateContactUseCase";
import { CreateRequestValidatorMiddleware } from "./adapter/controller/middleware/ValidateCreationRequest";
import { errorHandler } from "./config/error/ErrorHandler";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./config/swagger.json";
import UpdateContactUseCase from "./application/usecases/UpdateContactUseCase";
import DeleteContactUseCase from "./application/usecases/DeleteContactUseCase";
import SearchOneUseCase from "./application/usecases/SearchOneUseCase";

const port = process.env.port || 5000;
const app: Application = express();

container.register("CreateContactInPort", { useClass: CreateContactUseCase });
container.register("SearchContactsInPort", { useClass: SearchContactsUseCase });
container.register("SearchOneInPort", { useClass: SearchOneUseCase });
container.register("UpdateContactInPort", { useClass: UpdateContactUseCase });
container.register("DeleteContactInPort", { useClass: DeleteContactUseCase });
container.register("MongoDbRepository", { useClass: MongoDbAdapter });
container.register("CreateRequestValidatorMiddleware", {
  useClass: CreateRequestValidatorMiddleware,
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", container.resolve(ContactsController).routes());

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Url not valid or missing params");
  return res.status(404).json({
    message: error.message,
  });
});
app.use(errorHandler);

app.listen(port, async () => {
  await connectDB(), console.log(`listening on port: ${port}`);
});

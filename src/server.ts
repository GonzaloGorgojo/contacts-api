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

const port = process.env.port || 5000;
const app: Application = express();

container.register("CreateContactInPort", { useClass: CreateContactUseCase });
container.register("SearchContactsInPort", { useClass: SearchContactsUseCase });
container.register("MongoDbRepository", { useClass: MongoDbAdapter });
container.register("CreateRequestValidatorMiddleware", {
  useClass: CreateRequestValidatorMiddleware,
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", container.resolve(ContactsController).routes());
app.use(errorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Url not valid");
  return res.status(404).json({
    message: error.message,
  });
});

app.listen(port, async () => {
  await connectDB(), console.log(`listening on port: ${port}`);
});

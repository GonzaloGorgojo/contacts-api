import { NextFunction } from "express";
import Joi from "joi";
import { injectable } from "tsyringe";
import { Errors } from "../../../config/error/Errors";

const createRequestSchema = Joi.object({
  name: Joi.string().required().min(3).max(15),
  lastName: Joi.string().required().min(3).max(15),
  address: Joi.string().required().min(4).max(50),
  number: Joi.string().required().min(8).max(20),
});

@injectable()
export class CreateRequestValidatorMiddleware {
  public async handleRequest(req: any, next: any) {
    try {
      console.log("entro validacion");
      await createRequestSchema.validateAsync(req.body);
    } catch (error: any) {
      console.log("entro error");
      await next(Errors.badRequest(error.details[0].message));
      return;
    }
  }
}

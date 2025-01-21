
import AppError from "@shared/errors/AppError";
import { getErrosFromRequestValidation } from "@shared/errors/errorBuilder";
import {Request} from "express";
import { check } from "express-validator";

async function configureCheckForName(req: Request) {
  await check('name')
    .isString()
    .withMessage('Name deve ser uma string')
    .run(req);
}

async function configureCheckForPrice(req: Request) {
  await check('price')
    .isNumeric()
    .withMessage('Price deve ser um numero')
    .run(req);
}

async function configureCheckForQuantity(req: Request) {
  await check('quantity')
    .isInt()
    .withMessage('Quantity deve ser um numero inteiro')
    .run(req);
}


export default async function canUpdateProduct(req: Request): Promise<void>{
  await configureCheckForName(req);
  await configureCheckForPrice(req);
  await configureCheckForQuantity(req);

  const validationError = getErrosFromRequestValidation(req);

  if (validationError) {
    throw validationError;
  }
}

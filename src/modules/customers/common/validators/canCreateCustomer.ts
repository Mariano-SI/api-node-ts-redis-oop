
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

async function configureCheckForEmail(req: Request) {
  await check('email')
    .isEmail()
    .withMessage('Email deve ser um email valido')
    .run(req);
}



export default async function canCreateCustomer(req: Request): Promise<void>{
  await configureCheckForName(req);
  await configureCheckForEmail(req);


  const validationError = getErrosFromRequestValidation(req);

  if (validationError) {
    throw validationError;
  }
}

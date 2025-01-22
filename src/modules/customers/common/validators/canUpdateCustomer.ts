
import AppError from "@shared/errors/AppError";
import { getErrosFromRequestValidation } from "@shared/errors/errorBuilder";
import {Request} from "express";
import { check, param } from "express-validator";


async function configureCheckForId(req: Request) {
  await param('id')
    .isUUID()
    .withMessage('Parâmetro id deve estar no formato GUID')
    .run(req);
}

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


export default async function canUpdateCustomer(req: Request): Promise<void>{
  await configureCheckForId(req);
  await configureCheckForName(req);
  await configureCheckForEmail(req);


  const validationError = getErrosFromRequestValidation(req);

  if (validationError) {
    throw validationError;
  }
}

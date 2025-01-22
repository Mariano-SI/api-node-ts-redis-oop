
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
    .withMessage('Email deve ser um email válido.')
    .run(req);
}

async function configureCheckForPassword(req: Request) {
  await check('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_+=(){}[\]^~#|:;,.])[A-Za-z\d@$!%*?&-_+=(){}[\]^~#|:;,]{8,}$/)
    .withMessage('A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.')
    .run(req);
  }


export default async function canCreateUser(req: Request): Promise<void>{
  await configureCheckForName(req);
  await configureCheckForEmail(req);
  await configureCheckForPassword(req);

  const validationError = getErrosFromRequestValidation(req);

  if (validationError) {
    throw validationError;
  }
}

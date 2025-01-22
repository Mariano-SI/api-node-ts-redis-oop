
import AppError from "@shared/errors/AppError";
import { getErrosFromRequestValidation } from "@shared/errors/errorBuilder";
import {Request} from "express";
import { check } from "express-validator";

async function configureCheckForEmail(req: Request) {
  await check('email')
    .isEmail()
    .withMessage('Email deve ser um email válido.')
    .run(req);
}

async function configureCheckForPassword(req: Request) {
  await check('password')
    .isString()
    .withMessage('Senha deve ser uma string')
    .run(req);
  }


export default async function canCreateSession(req: Request): Promise<void>{
  await configureCheckForEmail(req);
  await configureCheckForPassword(req);

  const validationError = getErrosFromRequestValidation(req);

  if (validationError) {
    throw validationError;
  }
}

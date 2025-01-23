import { param } from "express-validator";
import { Request } from "express";
import { getErrosFromRequestValidation } from "@shared/errors/errorBuilder";

async function configureCheckForId(req: Request) {
  await param('id')
    .isUUID()
    .withMessage('Parâmetro id deve estar no formato GUID')
    .run(req);
}


export default async function canShowOrder(req: Request): Promise<void>{
  await configureCheckForId(req);

  const validationError = getErrosFromRequestValidation(req);

  if (validationError) {
    throw validationError;
  }
}

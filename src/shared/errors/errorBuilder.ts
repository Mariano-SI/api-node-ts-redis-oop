import { validationResult } from 'express-validator';
import { Request } from 'express';
import AppError from './AppError';

function getErrosFromRequestValidation(req: Request) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return new AppError(result.errors.map(x => x.msg).join('. '), 400);
  }
  return false;
}


export { getErrosFromRequestValidation};

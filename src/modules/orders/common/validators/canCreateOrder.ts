import { getErrosFromRequestValidation } from "@shared/errors/errorBuilder";
import {Request} from "express";
import { check } from "express-validator";

async function configureCheckForCustomerId(req: Request) {
  await check('customerId')
    .isUUID()
    .withMessage('CustomerId deve ser um UUID válido')
    .run(req);
}

async function configureCheckForProducts(req: Request) {
  await check('products')
    .isArray()
    .withMessage('Products deve ser um array válido')
    .notEmpty()
    .withMessage('Products não pode estar vazio')
    .custom((products: any[]) => {
      return products.every(product => {
        const hasId = 'id' in product && typeof product.id === 'string';
        const hasQuantity = 'quantity' in product &&
                          typeof product.quantity === 'number' &&
                          product.quantity > 0;

        return hasId && hasQuantity;
      });
    })
    .withMessage('Cada produto deve ter um id válido e uma quantidade maior que zero')
    .run(req);
}



export default async function canCreateOrder(req: Request): Promise<void>{
  await configureCheckForCustomerId(req);
  await configureCheckForProducts(req);


  const validationError = getErrosFromRequestValidation(req);

  if (validationError) {
    throw validationError;
  }
}

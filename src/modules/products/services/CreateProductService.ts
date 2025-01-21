import { getCustomRepository } from "typeorm"
import ProductRepository from "../typeorm/repositories/ProductsRepository"
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";

interface IRequest {
  name: string,
  price: number,
  quantity: number
}

export default class CreateProductService{
  public async execute({name, price, quantity}: IRequest): Promise<Product>{
    const productsRepository = getCustomRepository(ProductRepository);

    const productAlreadyExists = await productsRepository.findByName(name);

    if(productAlreadyExists){
      throw new AppError('O produto já existe', 409)
    }

    const product = productsRepository.create({name, price, quantity});
    const createdProduct = await productsRepository.save(product);
    return createdProduct;
  }
}

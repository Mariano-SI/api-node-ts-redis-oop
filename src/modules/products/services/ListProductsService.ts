import { getCustomRepository } from "typeorm"
import ProductRepository from "../typeorm/repositories/ProductsRepository"
import Product from "../typeorm/entities/Product";


export default class ListProductsService{
  public async execute(): Promise<Product[]>{
    const productsRepository = getCustomRepository(ProductRepository);

    return productsRepository.find();
  }
}

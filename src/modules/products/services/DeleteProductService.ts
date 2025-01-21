import { getCustomRepository } from "typeorm"
import ProductRepository from "../typeorm/repositories/ProductsRepository"
import { UUID } from "crypto";
import AppError from "@shared/errors/AppError";

interface IRequest{
  id: UUID,
}
export default class DeleteProductService{
  public async execute({id}: IRequest): Promise<void>{
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if(!product){
      throw new AppError('Produto inexistente', 404);
    }

    await productsRepository.remove(product);

  }
}

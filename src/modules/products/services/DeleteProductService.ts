import { getCustomRepository } from "typeorm"
import ProductRepository from "../typeorm/repositories/ProductsRepository"
import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";

interface IRequest{
  id: string,
}
export default class DeleteProductService{
  public async execute({id}: IRequest): Promise<void>{
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    const product = await productsRepository.findOne(id);

    if(!product){
      throw new AppError('Produto inexistente', 404);
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.remove(product);

  }
}

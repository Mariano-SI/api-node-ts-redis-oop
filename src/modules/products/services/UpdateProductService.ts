import { getCustomRepository } from "typeorm";
import ProductRepository from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";

interface IRequest{
  id: string,
  name: string,
  price: number,
  quantity: number
}
export default class UpdateProductService{
  public async execute({id, name, price, quantity}:IRequest){
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    const productToUpdate = await productsRepository.findOne(id);

    if(!productToUpdate){
      throw new AppError('Produto não encontrado', 404);
    }

    const nameAlreadyExists = await productsRepository.findByName(name);

    if(nameAlreadyExists && nameAlreadyExists.id !== productToUpdate.id){
      throw new AppError('Já existe um produto com esse nome', 409);
    }

    productToUpdate.name = name;
    productToUpdate.price = price;
    productToUpdate.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    return await productsRepository.save(productToUpdate)

  }
}

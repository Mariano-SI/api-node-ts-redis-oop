import { getCustomRepository } from "typeorm"
import ProductRepository from "../typeorm/repositories/ProductsRepository"
import Product from "../typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";


export default class ListProductsService{
  public async execute(): Promise<Product[]>{
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    const key = 'api-vendas-PRODUCT_LIST';
    let cachedProducts = await redisCache.recover<Product[]>(key);

    if(cachedProducts){
      return cachedProducts;
    }

    const products = await productsRepository.find();

    await redisCache.save(key, products);

    return products;
  }
}

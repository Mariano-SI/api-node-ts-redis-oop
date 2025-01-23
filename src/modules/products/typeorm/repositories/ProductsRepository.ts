import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return await this.findOne({ where: { name } });
  }
  
  public async findById(id: string): Promise<Product | undefined> {
    return await this.findOne(id);
  }
}

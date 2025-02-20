import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IPaginationCustomer{
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page?: number | null;
  next_page?: number | null;
  data: Customer[];
}

export default class ListCustomersService{
  public async execute():Promise<IPaginationCustomer>{
    const customerRepository =  getCustomRepository(CustomersRepository);
    const customers = await customerRepository.createQueryBuilder('customers').paginate();
    return customers as IPaginationCustomer;
  }
}

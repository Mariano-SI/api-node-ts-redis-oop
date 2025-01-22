import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
  id: string,
  name: string,
  email: string
}

export default class UpdateCustomerService{
  public async execute({id, name, email}: IRequest):Promise<Customer>{
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if(!customer){
      throw new AppError("Usuário não encontrado", 404);
    }
    const emailAlreadyExists = await customerRepository.findByEmail(email);

    if(emailAlreadyExists && emailAlreadyExists.id !== id){
      throw new AppError("Este email já esta em uso", 409);
    }

    customer.name = name;
    customer.email = email;

    return await customerRepository.save(customer);
  }
}

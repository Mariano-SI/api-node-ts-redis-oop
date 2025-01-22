import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
  name: string;
  email: string;
}

export default class CreateCustomerService{
  public async execute({name, email}: IRequest):Promise<Customer>{
    const customerRepository =  getCustomRepository(CustomersRepository);

    const emailAlreadyExists = await customerRepository.findByEmail(email);

    if(emailAlreadyExists){
      throw new AppError("Email já cadastrado", 409);
    }
    
    const customer = customerRepository.create({name, email});
    return await customerRepository.save(customer);
  }
}

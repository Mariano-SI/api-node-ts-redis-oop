import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";


interface IRequest{
  id: string
}

export default class ShowUserProfileService{
  public async execute({id}: IRequest): Promise<User>{
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(id);

    if(!user){
      throw new AppError('Usuário não encontrado');
    }
    return user;
  }
}

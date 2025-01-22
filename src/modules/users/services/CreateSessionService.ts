import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";

interface IRequest{
  email:string,
  password:string
}

interface IResponse{
  user: User
}

export default class CreateSessionService{
  public async execute({email, password}:IRequest):Promise<IResponse>{
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('Combinação incorreta de email/senha', 401);
    }

    const compatiblePassword = await compare(password, user.password);

    if(!compatiblePassword){
      throw new AppError('Combinação incorreta de email/senha', 401);
    }

    return {
      user
    }
  }
}

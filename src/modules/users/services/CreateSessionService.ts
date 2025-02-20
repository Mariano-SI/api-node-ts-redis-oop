import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth"

interface IRequest{
  email:string,
  password:string
}

interface IResponse{
  user: User,
  token: string
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

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    })

    return {
      user,
      token
    }
  }
}

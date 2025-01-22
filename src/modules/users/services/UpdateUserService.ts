import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";

interface IRequest{
  id: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string
}

export default class UpdateUserService{
  public async execute({id, name, email, password, oldPassword}: IRequest){
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    if(!user){
      throw new AppError("Usuário não encotrado", 404);
    }

    const emailExists = await usersRepository.findByEmail(email);

    if(emailExists && emailExists.id !== id){
      throw new AppError("Esse email já está em uso", 409);
    }

    if(password && !oldPassword){
      throw new AppError("Old password is required")
    }

    if(password && oldPassword){
      const checkOldPassword = await compare(oldPassword, user.password);

      if(!checkOldPassword){
        throw new AppError("")
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);
  }
}

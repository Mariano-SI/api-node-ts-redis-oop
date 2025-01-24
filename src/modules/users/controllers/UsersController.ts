import { Request, Response } from "express";
import ListUsersService from "../services/ListUsersService";
import CreateUserService from "../services/CreateUserService";
import { canCreateUser } from "../common/validators";
import { instanceToInstance } from "class-transformer";

export default class UsersController{
  public async index(req: Request, res: Response):Promise<Response>{
    const listUsersService = new ListUsersService();

    const users = await listUsersService.execute();

    return res.status(200).json(instanceToInstance(users));
  }

  public async create(req: Request, res: Response): Promise<Response>{
    const {name, email, password} = req.body;
    await canCreateUser(req);

    const createUserService = new CreateUserService();

    const createdUser = await createUserService.execute({name, email, password});

    return res.status(201).json(instanceToInstance(createdUser));
  }
}

import { Request, Response } from "express";
import CreateSessionService from "../services/CreateSessionService";
import { canCreateSession } from "../common/validators";
import { instanceToInstance } from "class-transformer";
export default class SessionsController{
  public async create(req: Request, res: Response): Promise<Response>{
    const {email, password} = req.body;
    const createSessionService = new CreateSessionService();

    await canCreateSession(req);
    const session = await createSessionService.execute({email, password});

    return res.status(201).json(instanceToInstance(session));
  }
}

import { Request, Response } from "express";
import CreateSessionService from "../services/CreateSessionService";

export default class SessionsController{
  public async create(req: Request, res: Response): Promise<Response>{
    const {email, password} = req.body;
    const createSessionService = new CreateSessionService();
    const session = await createSessionService.execute({email, password});

    return res.status(201).json(session);
  }
}

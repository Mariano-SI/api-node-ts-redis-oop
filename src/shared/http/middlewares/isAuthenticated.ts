import AppError from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth"
interface TokenPayload{
  iat: number,
  exp: number,
  sub: string
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction):void{
  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    const {sub} = decodedToken as TokenPayload;

    req.user = {
      id: sub
    }

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT', 401)
  }

}

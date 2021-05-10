import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";
import UsersRepository from "../modules/accounts/repositories/users/UsersRepository";
import authConfig from "../shared/config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new Error("Token is missing!");

  const [, token] = authHeader.split(" ");

  const verifyToken = verify(token, authConfig.jwt.secret) as IPayload;

  if (!verifyToken) throw new Error("Invalid token");

  const { sub } = verifyToken;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(sub);
  if (!user) throw new Error("This user does not exist");

  next();
}

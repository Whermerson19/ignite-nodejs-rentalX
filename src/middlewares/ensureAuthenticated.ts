import { Request, Response, NextFunction } from "express";

import UsersRepository from "../modules/accounts/repositories/users/UsersRepository";

import { verify } from "jsonwebtoken";

import authConfig from "../shared/config/auth";
import AppError from "../shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError("Token is missing!", 401);

  const [, token] = authHeader.split(" ");

  try {
    const verifyToken = verify(token, authConfig.jwt.secret) as IPayload;

    const { sub } = verifyToken;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(sub);
    if (!user) throw new AppError("This user does not exist", 401);

    request.user = {
      id: sub,
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}

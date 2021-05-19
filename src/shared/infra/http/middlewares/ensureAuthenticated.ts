import { Request, Response, NextFunction } from "express";

import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

import { verify } from "jsonwebtoken";

import authConfig from "@shared/config/auth";
import AppError from "@shared/errors/AppError";
import UsersTokensRepository from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

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
    const verifyToken = verify(token, authConfig.refresh_token.secret) as IPayload;

    const { sub } = verifyToken;

    request.user = {
      id: sub
    }

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}

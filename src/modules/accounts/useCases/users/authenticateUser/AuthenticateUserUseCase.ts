import { inject, injectable } from "tsyringe";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import authConfig from '@shared/config/auth'
import AppError from "@shared/errors/AppError";
import User from "@modules/accounts/entities/User";
import IUsersRepository from "@modules/accounts/repositories/users/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError("Incorret email or password!");

    const comparedPassword = await compare(password, user.password);

    if (!comparedPassword) throw new AppError("Incorret email or password!");

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

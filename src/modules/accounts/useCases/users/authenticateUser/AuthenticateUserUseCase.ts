import { inject, injectable } from "tsyringe";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import User from "@modules/accounts/infra/typeorm/entities/User";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";

import authConfig from "@shared/config/auth";
import AppError from "@shared/errors/AppError";
import IUsersTokensRepository from "@modules/accounts/repositories/IUsersTokensRepository";
import IDateProvider from "@shared/container/providers/Date/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  refresh_token: string;
}

@injectable()
export default class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
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

    const refresh_token = sign({ email }, authConfig.refresh_token.secret, {
      subject: user.id,
      expiresIn: authConfig.refresh_token.expiresIn,
    });

    await this.usersTokensRepository.create({
      expires_date: this.dateProvider.addDays(
        authConfig.refresh_token.expires_days
      ),
      refresh_token,
      userId: user.id,
    });

    return {
      user,
      token,
      refresh_token,
    };
  }
}

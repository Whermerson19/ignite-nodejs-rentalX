import { inject, injectable } from "tsyringe";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUsersTokensRepository from "@modules/accounts/repositories/IUsersTokensRepository";
import IDateProvider from "@shared/container/providers/Date/IDateProvider";

import { hash } from "bcryptjs";
import AppError from "@shared/errors/AppError";
import { app } from "@shared/infra/http/app";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DateProvider")
    private dataProvider: IDateProvider
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const usersToken = await this.usersTokensRepository.findByToken(token);

    if (!usersToken) throw new AppError("Invalid token", 401);

    const isBefore = this.dataProvider.isBefore(
      usersToken.expires_date,
      this.dataProvider.dateNow()
    );

    if (isBefore) throw new AppError("Expired token");

    const user = await this.usersRepository.findById(usersToken.userId);
    if (!user) throw new AppError("Invalid userId");

    user.password = await hash(password, 10);

    await this.usersRepository.save(user);
    await this.usersTokensRepository.deleleById(usersToken.id);
  }
}

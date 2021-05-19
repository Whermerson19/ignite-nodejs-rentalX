import { inject, injectable } from "tsyringe";

import { v4 } from "uuid";

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUsersTokensRepository from "@modules/accounts/repositories/IUsersTokensRepository";

import AppError from "@shared/errors/AppError";
import IDateProvider from "@shared/container/providers/Date/IDateProvider";
import IMailProvider from "@shared/container/providers/Mail/IMailProvider";

@injectable()
export default class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError("User does not exist", 404);

    const token = v4();

    await this.usersTokensRepository.create({
      expires_date: this.dateProvider.addHours(3),
      refresh_token: token,
      userId: user.id,
    });

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      `O link para o reset é ${token}`
    );
  }
}

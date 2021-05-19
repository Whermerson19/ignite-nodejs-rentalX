import { inject, injectable } from "tsyringe";

import path from "path";

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

    const templatePath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "views",
      "emails",
      "forgot_password.hbs"
    );

    const token = v4();

    await this.usersTokensRepository.create({
      expires_date: this.dateProvider.addHours(3),
      refresh_token: token,
      userId: user.id,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );
  }
}

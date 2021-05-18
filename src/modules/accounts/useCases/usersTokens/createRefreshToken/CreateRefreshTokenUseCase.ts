import IUsersTokensRepository from "@modules/accounts/repositories/IUsersTokensRepository";
import authConfig from "@shared/config/auth";
import IDateProvider from "@shared/container/providers/Date/IDateProvider";
import AppError from "@shared/errors/AppError";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
  sub: string;
  email: string;
}

interface IResponse {
  refresh_token: string;
}

@injectable()
export default class CreateRefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  public async execute(token: string): Promise<IResponse> {
    const decode = verify(token, authConfig.refresh_token.secret) as IPayload;

    const userId = decode.sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token
      );
    if (!userToken) throw new AppError("Refresh token does not exist");

    await this.usersTokensRepository.deleleById(userToken.id);

    const refresh_token = sign(
      { email: decode.email },
      authConfig.refresh_token.secret,
      {
        subject: decode.sub,
        expiresIn: authConfig.refresh_token.expiresIn,
      }
    );

    await this.usersTokensRepository.create({
      expires_date: this.dateProvider.addDays(
        authConfig.refresh_token.expires_days
      ),
      refresh_token,
      userId: decode.sub,
    });

    return { refresh_token };
  }
}

import ICreateUsersTokensDTO from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import IUsersTokensRepository from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import UserTokens from "../entities/UserTokens";

export default class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserTokens>;
  constructor() {
    this.ormRepository = getRepository(UserTokens);
  }

  async create({
    userId,
    refresh_token,
    expires_date,
  }: ICreateUsersTokensDTO): Promise<UserTokens> {
    const userToken = this.ormRepository.create({
      userId,
      expires_date,
      refresh_token,
    });

    return this.ormRepository.save(userToken);
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    token: string
  ): Promise<UserTokens | undefined> {
    return this.ormRepository.findOne({ userId, refresh_token: token });
  }

  async deleleById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

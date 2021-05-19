import ICreateUsersTokensDTO from "../dtos/ICreateUsersTokensDTO";
import UserTokens from "../infra/typeorm/entities/UserTokens";

export default interface IUsersTokensRepository {
  create(data: ICreateUsersTokensDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    userId: string,
    token: string
  ): Promise<UserTokens | undefined>;
  deleleById(id: string): Promise<void>;
  findByToken(token: string): Promise<UserTokens | undefined>;
}

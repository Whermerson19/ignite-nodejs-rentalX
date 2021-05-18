import ICreateUsersTokensDTO from "../dtos/ICreateUsersTokensDTO";
import UsersToken from "../infra/typeorm/entities/UserTokens";

export default interface IUsersTokensRepository {
  create(data: ICreateUsersTokensDTO): Promise<UsersToken>;
  findByUserIdAndRefreshToken(
    userId: string,
    token: string
  ): Promise<UsersToken | undefined>;
  deleleById(id: string): Promise<void>
}

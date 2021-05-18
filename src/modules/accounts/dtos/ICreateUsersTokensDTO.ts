export default interface ICreateUsersTokensDTO {
  userId: string;
  expires_date: Date;
  refresh_token: string;
}
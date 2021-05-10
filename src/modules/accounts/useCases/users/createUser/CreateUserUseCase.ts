import { inject, injectable } from "tsyringe";

import User from "../../../entities/User";

import IUsersRepository from "../../../repositories/users/IUsersRepository";
import ICreateUserDTO from "../../../dtos/ICreateUserDTO";

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driverLicense,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.usersRepository.create({
      name,
      email,
      password,
      driverLicense,
    });

    return user;
  }
}

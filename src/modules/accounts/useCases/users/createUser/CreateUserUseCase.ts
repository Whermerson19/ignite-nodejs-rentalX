import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import AppError from "@shared/errors/AppError";

import User from "@modules/accounts/infra/typeorm/entities/User";

import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";

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
    const userAlreadyExist = await this.usersRepository.findByEmail(email);

    if (userAlreadyExist) throw new AppError("User already exist");

    const encryptedPassword = await hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: encryptedPassword,
      driverLicense,
    });

    return user;
  }
}

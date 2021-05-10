import { inject, injectable } from "tsyringe";

import User from "../../../entities/User";

import IUsersRepository from "../../../repositories/users/IUsersRepository";
import ICreateUserDTO from "../../../dtos/ICreateUserDTO";

import { hash } from "bcryptjs";
import AppError from "../../../../../shared/errors/AppError";

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

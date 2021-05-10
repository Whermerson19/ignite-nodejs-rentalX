import { getRepository, Repository } from "typeorm";
import ICreateUserDTO from "../../dtos/ICreateUserDTO";

import User from "../../entities/User";

import IUsersRepository from "./IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driverLicense,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      driverLicense,
    });

    return this.ormRepository.save(user);
  }

  async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

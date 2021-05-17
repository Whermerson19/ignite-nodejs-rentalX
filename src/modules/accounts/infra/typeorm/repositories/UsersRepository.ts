import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import Car from "@modules/cars/infra/typeorm/entities/Car";
import { getRepository, Repository } from "typeorm";

import User from "../entities/User";

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ email });

    return user;
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

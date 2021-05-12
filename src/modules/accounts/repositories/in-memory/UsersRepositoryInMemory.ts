
import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import User from "@modules/accounts/infra/typeorm/entities/User";
import IUsersRepository from "../IUsersRepository";

export default class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((curr) => curr.id === id);

    return user;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((curr) => curr.email === email);

    return user;
  }
  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    const { name, email, password, driverLicense } = data;

    Object.assign(user, {
      id: Math.floor(Math.random() * 93847589237).toString(),
      name,
      email,
      password,
      driverLicense,
      isAdmin: false,
      avatar: null,
      createdAt: new Date(),
    });

    this.users.push(user);

    return user;
  }
  async save(user: User): Promise<User> {
    return user;
  }
}

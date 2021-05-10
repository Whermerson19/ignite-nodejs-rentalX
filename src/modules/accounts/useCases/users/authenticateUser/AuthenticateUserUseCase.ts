import { inject, injectable } from "tsyringe";
import User from "../../../entities/User";

import IUsersRepository from "../../../repositories/users/IUsersRepository";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new Error("Incorret email or password!");

    const comparedPassword = await compare(password, user.password);

    if (!comparedPassword) throw new Error("Incorret email or password!");

    const token = sign({}, "483da795e5fea30ecc015d0947c07ecf", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user,
      token,
    };
  }
}

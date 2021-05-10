import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUserUseCase from "./CreateUserUseCase";

import { classToClass } from "class-transformer";

export default class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { name, email, password, driverLicense } = request.body;

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      driverLicense,
    });

    return response.status(201).json(classToClass(user));
  }
}

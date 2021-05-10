import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

import { classToClass } from "class-transformer";

export default class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );

      const { email, password } = request.body;

      const data = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.status(200).json(classToClass(data));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

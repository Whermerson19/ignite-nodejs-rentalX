import { Request, Response } from "express";
import { container } from "tsyringe";

import ResetPasswordUseCase from "./ResetPasswordUseCase";

export default class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    const { password } = request.body;
    const { token } = request.params;

    await resetPasswordUseCase.execute({
      password,
      token: token as string,
    });

    return response.status(200).send();
  }
}

import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateRefreshTokenUseCase from "./CreateRefreshTokenUseCase";

export default class CreateRefreshTokenController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const createRefreshTokenUseCase = container.resolve(
      CreateRefreshTokenUseCase
    );

    const token =
      request.body.token ||
      request.headers["x-acess-token"] ||
      request.query.token;

    const refresh_token = await createRefreshTokenUseCase.execute(token);

    return response.status(201).json(refresh_token);
  }
}

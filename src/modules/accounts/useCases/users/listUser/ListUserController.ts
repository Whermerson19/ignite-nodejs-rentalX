import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

import ListUserUseCase from "./ListUserUseCase";

export default class ListUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listUserUseCase = container.resolve(ListUserUseCase);

    const id = request.user.id;

    const user = await listUserUseCase.execute(id);

    return response.json(classToClass(user));
  }
}

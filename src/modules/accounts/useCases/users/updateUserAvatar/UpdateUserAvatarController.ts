import { Request, Response } from "express";

import { classToClass } from "class-transformer";

import { container } from "tsyringe";

import UpdateUserAvatarUseCase from "./UpdateUserAvatarUseCase";

export default class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const userId = request.user.id;
    const avatarFile = request.file.filename;

    const user = await updateUserAvatarUseCase.execute({
      avatarFile,
      userId,
    });

    return response.status(201).json(classToClass(user));
  }
}

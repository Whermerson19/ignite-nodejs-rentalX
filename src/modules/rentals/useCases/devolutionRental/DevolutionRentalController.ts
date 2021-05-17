import { Request, Response } from "express";
import { container } from "tsyringe";

import { classToClass } from "class-transformer";

import DevolutionRentalUseCase from "./DevolutionRentalUseCase";

export default class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const userId = request.user.id;
    const { id } = request.params;

    const rental = await devolutionRentalUseCase.execute({
      id,
      userId,
    });

    return response.status(200).json(classToClass(rental));
  }
}

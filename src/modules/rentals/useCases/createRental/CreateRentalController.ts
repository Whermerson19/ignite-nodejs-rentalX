import { Request, Response } from "express";

import { classToClass } from "class-transformer";

import { container } from "tsyringe";

import CreateRentalUseCase from "./CreateRentalUseCase";

export default class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const userId = request.user.id;
    const { expectedReturnDate } = request.body;
    const { carId } = request.params;

    const rental = await createRentalUseCase.execute({
      userId,
      carId,
      expectedReturnDate,
    });

    return response.status(201).json(classToClass(rental));
  }
}

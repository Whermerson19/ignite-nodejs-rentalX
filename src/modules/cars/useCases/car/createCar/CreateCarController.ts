import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCarUseCase from "./CreateCarUseCase";

export default class CreateCarController {

  async handle(request: Request, response: Response): Promise<Response> {
    const createCarUseCase = container.resolve(CreateCarUseCase);

    const { name, description, dailyRate, licensePlate, fineAmount, brand } =
      request.body;

    const { categoryId } = request.params;

    const car = await createCarUseCase.execute({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    return response.status(201).json(classToClass(car));
  }
}

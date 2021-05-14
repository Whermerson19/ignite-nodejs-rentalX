import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase";

export default class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const { carId } = request.params;
    const { specificationsId } = request.body;

    const cars = await createCarSpecificationUseCase.execute({
      carId,
      specificationsId,
    });

    return response.status(200).json(classToClass(cars));
  }
}

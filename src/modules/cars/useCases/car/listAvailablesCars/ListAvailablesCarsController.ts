import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

import ListAvailablesCarsUseCase from "./ListAvailablesCarsUseCase";

export default class ListAvailablesCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAvailablesCarsUseCase = container.resolve(
      ListAvailablesCarsUseCase
    );

    const { categoryId, brand, name } = request.query;

    const cars = await listAvailablesCarsUseCase.execute({
      categoryId: categoryId as string,
      brand: brand as string,
      name: name as string,
    });

    return response.status(200).json(classToClass(cars));
  }
}

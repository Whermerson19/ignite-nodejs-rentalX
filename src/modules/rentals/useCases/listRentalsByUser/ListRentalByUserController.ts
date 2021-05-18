import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";
import ListRentalByUserUseCase from "./ListRentalByUserUseCase";

export default class ListRentalByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listRentalByUserUseCase = container.resolve(ListRentalByUserUseCase);

    const userId = request.user.id;

    const rentals = await listRentalByUserUseCase.execute(userId);

    return response.status(200).json(classToClass(rentals));
  }
}

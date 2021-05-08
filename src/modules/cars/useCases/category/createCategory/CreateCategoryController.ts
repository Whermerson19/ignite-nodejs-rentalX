import { Request, Response } from "express";

import CreateCategoryUseCase from "./CreateCategoryUseCase";

export default class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      const category = await this.createCategoryUseCase.execute({
        name,
        description,
      });

      return response.status(201).json(category);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

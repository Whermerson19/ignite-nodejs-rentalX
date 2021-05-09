import { Request, Response } from "express";
import { container } from "tsyringe";

import ListCategoryUseCase from "./ListCategoryUseCase";

export default class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listCategoryUseCase = container.resolve(ListCategoryUseCase);

      const list = await listCategoryUseCase.execute();

      return response.status(200).json(list);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

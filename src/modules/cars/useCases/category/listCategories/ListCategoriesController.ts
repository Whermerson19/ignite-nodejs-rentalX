import { Request, Response } from "express";

import ListCategoryUseCase from "./ListCategoryUseCase";

export default class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const list = await this.listCategoryUseCase.execute();

      return response.status(200).json(list);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

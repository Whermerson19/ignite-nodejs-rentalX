import { Request, Response } from "express";
import ImportCategoryUseCase from "./ImportCategoryUseCase";

export default class ImportCategoryController {
  constructor(private importCategoryController: ImportCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request;

      await this.importCategoryController.execute(file);

      return response.status(201).json({ sucess: "Categorias importadas com sucesso!" });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

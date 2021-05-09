import { Request, Response } from "express";
import { container } from "tsyringe";
import ImportCategoryUseCase from "./ImportCategoryUseCase";

export default class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request;

      const importCategoryController = container.resolve(ImportCategoryUseCase);

      await importCategoryController.execute(file);

      return response
        .status(201)
        .json({ sucess: "Categorias importadas com sucesso!" });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

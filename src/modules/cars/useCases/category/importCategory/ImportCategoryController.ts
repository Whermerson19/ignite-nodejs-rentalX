import { Request, Response } from "express";
import ImportCategoryUseCase from "./ImportCategoryUseCase";

export default class ImportCategoryController {

  constructor(private importCategoryController: ImportCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { file } = request;
    
    this.importCategoryController.execute(file);

    return response.send();
  }
}

import { Request, Response } from "express";

import CreateSpecificationUseCase from "./CreateSpecificationUseCase";

export default class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      const specification = await this.createSpecificationUseCase.execute({
        name,
        description,
      });

      return response.status(201).json(specification);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

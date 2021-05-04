import { Router } from "express";
import SpecificationsRepository from "../modules/cars/repositories/specifications/SpecificationsRepository";
import CreateCategoryUseCase from "../modules/cars/useCases/createCategory/CreateCategoryUseCase";

const specificationRouter = Router();
const specificationsRepository = new SpecificationsRepository();

specificationRouter.post("/", (request, response) => {
  const service = new CreateCategoryUseCase(specificationsRepository);

  const { name, description } = request.body;

  service.execute({
    name,
    description,
  });

  return response.status(201).send();
});

export default specificationRouter;

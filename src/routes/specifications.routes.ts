import { Router } from "express";

import createSpecificationController from "../modules/cars/useCases/specifications/createSpecification";

const specificationRouter = Router();

specificationRouter.post("/", (request, response) =>
  createSpecificationController().handle(request, response)
);

export default specificationRouter;

import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureAdmin from "@shared/infra/http/middlewares/ensureAdmin";
import CreateSpecificationController from "@modules/cars/useCases/specifications/createSpecification/CreateSpecificationController";

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

export default specificationRouter;

import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import CreateSpecificationController from "@modules/cars/useCases/specifications/createSpecification/CreateSpecificationController";


const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouter.use(ensureAuthenticated);

specificationRouter.post("/", createSpecificationController.handle);

export default specificationRouter;

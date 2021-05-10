import { Router } from "express";

import { ensureAuthenticated } from "../../../middlewares/ensureAuthenticated";

import CreateSpecificationController from "../useCases/specifications/createSpecification/CreateSpecificationController";

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouter.use(ensureAuthenticated);

specificationRouter.post("/", createSpecificationController.handle);

export default specificationRouter;

import { Router } from "express";
import CreateSpecificationController from "../useCases/specifications/createSpecification/CreateSpecificationController";

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouter.post("/", createSpecificationController.handle);

export default specificationRouter;

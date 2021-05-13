import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import CreateCarController from "@modules/cars/useCases/car/createCar/CreateCarController";

const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post(
  "/:categoryId",
  ensureAuthenticated,
  createCarController.handle
);

export default carsRouter;

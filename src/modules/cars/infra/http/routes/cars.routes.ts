import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import CreateCarController from "@modules/cars/useCases/car/createCar/CreateCarController";
import ensureAdmin from "@shared/infra/http/middlewares/ensureAdmin";

const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post(
  "/:categoryId",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

export default carsRouter;

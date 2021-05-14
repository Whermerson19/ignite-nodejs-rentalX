import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import CreateCarController from "@modules/cars/useCases/car/createCar/CreateCarController";
import ensureAdmin from "@shared/infra/http/middlewares/ensureAdmin";
import ListAvailablesCarsController from "@modules/cars/useCases/car/listAvailablesCars/ListAvailablesCarsController";
import CreateCarSpecificationController from "@modules/cars/useCases/car/createCarSpecification/CreateCarSpecificationController";

const carsRouter = Router();

const createCarController = new CreateCarController();
const listAvailablesCarsController = new ListAvailablesCarsController();

const createCarSpecificationController = new CreateCarSpecificationController();

carsRouter.post(
  "/:categoryId",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRouter.get("/available", listAvailablesCarsController.handle);

carsRouter.post(
  "/specifications/:carId",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

export default carsRouter;

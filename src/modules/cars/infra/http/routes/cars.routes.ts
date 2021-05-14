import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureAdmin from "@shared/infra/http/middlewares/ensureAdmin";

import CreateCarController from "@modules/cars/useCases/car/createCar/CreateCarController";
import ListAvailablesCarsController from "@modules/cars/useCases/car/listAvailablesCars/ListAvailablesCarsController";
import CreateCarSpecificationController from "@modules/cars/useCases/car/createCarSpecification/CreateCarSpecificationController";
import UploadCarsImageController from "@modules/cars/useCases/car/uploadCarsImage/UploadCarsImageController";

import uploadConfig from "@shared/config/upload";

const carsRouter = Router();

const uploadImages = multer(uploadConfig.upload("./tmp/cars"))

const createCarController = new CreateCarController();
const listAvailablesCarsController = new ListAvailablesCarsController();

const createCarSpecificationController = new CreateCarSpecificationController();

const uploadCarsImageController = new UploadCarsImageController();

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

carsRouter.patch(
  "/images/:carId",
  ensureAuthenticated,
  ensureAdmin,
  uploadImages.array("images"),
  uploadCarsImageController.handle
);

export default carsRouter;

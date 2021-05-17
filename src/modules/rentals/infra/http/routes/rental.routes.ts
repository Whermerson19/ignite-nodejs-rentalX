import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import CreateRentalController from "@modules/rentals/useCases/createRental/CreateRentalController";
import DevolutionRentalController from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

const rentalRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRouter.post(
  "/:carId",
  ensureAuthenticated,
  createRentalController.handle
);

rentalRouter.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);

export default rentalRouter;

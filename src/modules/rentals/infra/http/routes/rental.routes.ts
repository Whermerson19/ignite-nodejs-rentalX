import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import CreateRentalController from "@modules/rentals/useCases/createRental/CreateRentalController";
import DevolutionRentalController from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import ListRentalByUserController from "@modules/rentals/useCases/listRentalsByUser/ListRentalByUserController";

const rentalRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();

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

rentalRouter.get(
  "/user",
  ensureAuthenticated,
  listRentalByUserController.handle
);

export default rentalRouter;

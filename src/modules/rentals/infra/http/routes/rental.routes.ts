import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import CreateRentalController from "@modules/rentals/useCases/createRental/CreateRentalController";

const rentalRouter = Router();

const createRentalController = new CreateRentalController();

rentalRouter.post("/:carId", ensureAuthenticated, createRentalController.handle);

export default rentalRouter;

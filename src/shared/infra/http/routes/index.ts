import { Router } from "express";

import usersRouter from "@modules/accounts/infra/http/routes/users.routes";
import sessionsRouter from "@modules/accounts/infra/http/routes/sessions.routes";

import categoriesRouter from "@modules/cars/infra/http/routes/categories.routes";
import specificationsRouter from "@modules/cars/infra/http/routes/specifications.routes";
import carsRouter from "@modules/cars/infra/http/routes/cars.routes";

import rentalRouter from "@modules/rentals/infra/http/routes/rental.routes";

const appRouter = Router();

// Cars Module
appRouter.use("/categories", categoriesRouter);
appRouter.use("/specifications", specificationsRouter);
appRouter.use("/cars", carsRouter);

// Accounts Module
appRouter.use("/users", usersRouter);
appRouter.use("/sessions", sessionsRouter);

//Rentals Module
appRouter.use("/rentals", rentalRouter)

export default appRouter;

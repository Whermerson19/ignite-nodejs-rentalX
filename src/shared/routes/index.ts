import { Router } from "express";

import categoriesRouter from "../../modules/cars/routes/categories.routes";
import specificationsRouter from "../../modules/cars/routes/specifications.routes";

import userRouter from "../../modules/accounts/routes/user.routes";

const appRouter = Router();

// Cars Module
appRouter.use("/categories", categoriesRouter);
appRouter.use("/specifications", specificationsRouter);

// Accounts Module
appRouter.use("/user", userRouter);

export default appRouter;

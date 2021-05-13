import { Router } from "express";

import categoriesRouter from "@modules/cars/infra/http/routes/categories.routes";
import specificationsRouter from "@modules/cars/infra/http/routes/specifications.routes";

import usersRouter from "@modules/accounts/infra/http/routes/users.routes";
import sessionsRouter from "@modules/accounts/infra/http/routes/sessions.routes";

const appRouter = Router();

// Cars Module
appRouter.use("/categories", categoriesRouter);
appRouter.use("/specifications", specificationsRouter);

// Accounts Module
appRouter.use("/users", usersRouter);
appRouter.use("/sessions", sessionsRouter);

export default appRouter; 

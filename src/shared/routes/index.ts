import { Router } from 'express'

import categoriesRouter from '../../modules/cars/routes/categories.routes';
import specificationsRouter from '../../modules/cars/routes/specifications.routes'

const appRouter = Router()

// Module Cars
appRouter.use("/categories", categoriesRouter);
appRouter.use("/specifications", specificationsRouter);

export default appRouter;
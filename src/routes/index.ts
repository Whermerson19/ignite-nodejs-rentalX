import { Router } from 'express'
import categoriesRouter from './categories.routes';
import specificationRouter from './specifications.routes';

const appRouter = Router()

appRouter.use("/categories", categoriesRouter);
appRouter.use("/specifications", specificationRouter);

export default appRouter; 
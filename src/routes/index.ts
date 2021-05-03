import { Router } from 'express'
import categoriesRouter from './categories.routes';

const appRouter = Router()

appRouter.use("/categories", categoriesRouter);

export default appRouter; 
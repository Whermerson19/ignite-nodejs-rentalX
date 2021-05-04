import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/category/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/category/listCategories";

const categoriesRouter = Router();

categoriesRouter.post("/", (request, response) =>
  createCategoryController.handle(request, response)
);

categoriesRouter.get("/", (request, response) =>
  listCategoriesController.handle(request, response)
);

export default categoriesRouter;

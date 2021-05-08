import { Router } from "express";
import multer from "multer";

import createCategoryController from "../modules/cars/useCases/category/createCategory";
import importCategoryController from "../modules/cars/useCases/category/importCategory";
import listCategoriesController from "../modules/cars/useCases/category/listCategories";

const categoriesRouter = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRouter.post("/", (request, response) => {
  createCategoryController().handle(request, response);
});

categoriesRouter.get("/", (request, response) =>
  listCategoriesController().handle(request, response)
);

categoriesRouter.post("/import", upload.single("file"), (request, response) =>
  importCategoryController().handle(request, response)
);

export default categoriesRouter;

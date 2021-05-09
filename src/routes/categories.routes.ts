import { Router } from "express";
import multer from "multer";
import CreateCategoryController from "../modules/cars/useCases/category/createCategory/CreateCategoryController";

import importCategoryController from "../modules/cars/useCases/category/importCategory";
import listCategoriesController from "../modules/cars/useCases/category/listCategories";

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();

const upload = multer({
  dest: "./tmp",
});

categoriesRouter.post("/", createCategoryController.handle);

categoriesRouter.get("/", (request, response) =>
  listCategoriesController().handle(request, response)
);

categoriesRouter.post("/import", upload.single("file"), (request, response) =>
  importCategoryController().handle(request, response)
);

export default categoriesRouter;

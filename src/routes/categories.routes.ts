import { Router } from "express";
import multer from "multer";

import CreateCategoryController from "../modules/cars/useCases/category/createCategory/CreateCategoryController";
import ImportCategoryController from "../modules/cars/useCases/category/importCategory/ImportCategoryController";
import ListCategoriesController from "../modules/cars/useCases/category/listCategories/ListCategoriesController";

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({
  dest: "./tmp",
});

categoriesRouter.post("/", createCategoryController.handle);

categoriesRouter.get("/", listCategoriesController.handle);

categoriesRouter.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export default categoriesRouter;

import { Router } from "express";

import multer from "multer";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureAdmin from "@shared/infra/http/middlewares/ensureAdmin";

import CreateCategoryController from "@modules/cars/useCases/category/createCategory/CreateCategoryController";
import ImportCategoryController from "@modules/cars/useCases/category/importCategory/ImportCategoryController";
import ListCategoriesController from "@modules/cars/useCases/category/listCategories/ListCategoriesController";

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({
  dest: "./tmp",
});

categoriesRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRouter.get(
  "/",
  ensureAuthenticated,
  listCategoriesController.handle
);

categoriesRouter.post(
  "/import",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("file"),
  importCategoryController.handle
);

export default categoriesRouter;

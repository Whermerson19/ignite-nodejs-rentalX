import { Router } from "express";

import multer from "multer";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import CreateCategoryController from "../useCases/category/createCategory/CreateCategoryController";
import ImportCategoryController from "../useCases/category/importCategory/ImportCategoryController";
import ListCategoriesController from "../useCases/category/listCategories/ListCategoriesController";

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({
  dest: "./tmp",
});

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.post("/", createCategoryController.handle);

categoriesRouter.get("/", listCategoriesController.handle);

categoriesRouter.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export default categoriesRouter;

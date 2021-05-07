import CategoriesRepository from "../../../repositories/category/CategoriesRepository";
import ImportCategoryController from "./ImportCategoryController";
import ImportCategoryUseCase from "./ImportCategoryUseCase";

const categoryRepository = CategoriesRepository.getInstance();

const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);

export const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

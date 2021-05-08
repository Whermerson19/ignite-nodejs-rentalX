import CategoriesRepository from "../../../repositories/category/CategoriesRepository";
import ListCategoriesController from "./ListCategoriesController";
import ListCategoryUseCase from "./ListCategoryUseCase";

export default (): ListCategoriesController => {
  const categoriesRepository = new CategoriesRepository();

  const listCategoryUseCase = new ListCategoryUseCase(categoriesRepository);

  const listCategoriesController = new ListCategoriesController(
    listCategoryUseCase
  );

  return listCategoriesController;
};

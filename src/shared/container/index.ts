import { container } from "tsyringe";
import CategoriesRepository from "../../modules/cars/repositories/category/CategoriesRepository";
import ICategoryRepository from "../../modules/cars/repositories/category/ICategoriesRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

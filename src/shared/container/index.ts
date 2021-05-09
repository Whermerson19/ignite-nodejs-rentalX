import { container } from "tsyringe";
import CategoriesRepository from "../../modules/cars/repositories/category/CategoriesRepository";
import ICategoryRepository from "../../modules/cars/repositories/category/ICategoriesRepository";
import ISpecificationsRepository from "../../modules/cars/repositories/specifications/ISpecificationsRepository";
import SpecificationsRepository from "../../modules/cars/repositories/specifications/SpecificationsRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

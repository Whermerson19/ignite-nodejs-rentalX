import { container } from "tsyringe";

import IUsersRepository from "../../modules/accounts/repositories/users/IUsersRepository";
import ICategoryRepository from "../../modules/cars/repositories/category/ICategoriesRepository";
import ISpecificationsRepository from "../../modules/cars/repositories/specifications/ISpecificationsRepository";

import UsersRepository from "../../modules/accounts/repositories/users/UsersRepository";
import CategoriesRepository from "../../modules/cars/repositories/category/CategoriesRepository";
import SpecificationsRepository from "../../modules/cars/repositories/specifications/SpecificationsRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

import { container } from "tsyringe";

import "./providers";

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import ICategoryRepository from "@modules/cars/repositories/ICategoriesRepository";
import ISpecificationsRepository from "@modules/cars/repositories/ISpecificationsRepository";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import ICarsImageRepository from "@modules/cars/repositories/ICarsImageRepository";

import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import CategoriesRepository from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import SpecificationsRepository from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import CarsRepository from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import CarsImageRepository from "@modules/cars/infra/typeorm/repositories/CarsImageRepository";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import RentalsRepository from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";


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

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImageRepository>(
  "CarsImageRepository",
  CarsImageRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

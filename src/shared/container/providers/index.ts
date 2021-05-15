import { container } from "tsyringe";

import IDateProvider from "./Date/IDateProvider";
import IStorageProvider from "./Storage/IStorageProvider";

import DateProvider from "./Date/DateProvider";
import StorageProvider from "./Storage/StorageProvider";

container.registerSingleton<IDateProvider>("DateProvider", DateProvider);
container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  StorageProvider
);


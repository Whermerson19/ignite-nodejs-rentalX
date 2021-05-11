import { container } from "tsyringe";

import IStorageProvider from "./Storage/IStorageProvider";
import StorageProvider from "./Storage/StorageProvider";

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  StorageProvider
);

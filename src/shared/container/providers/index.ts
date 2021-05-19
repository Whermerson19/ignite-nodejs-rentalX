import { container } from "tsyringe";

import IDateProvider from "./Date/IDateProvider";
import IStorageProvider from "./Storage/IStorageProvider";

import DateProvider from "./Date/DateProvider";
import StorageProvider from "./Storage/StorageProvider";
import IMailProvider from "./Mail/IMailProvider";
import MailProvider from "./Mail/MailProvider";

container.registerSingleton<IDateProvider>("DateProvider", DateProvider);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  StorageProvider
);

container.registerInstance<IMailProvider>("MailProvider", new MailProvider());

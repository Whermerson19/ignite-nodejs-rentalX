import { container } from "tsyringe";

import IDateProvider from "./Date/IDateProvider";
import IStorageProvider from "./Storage/IStorageProvider";

import DateProvider from "./Date/DateProvider";
import LocalStorageProvider from "./Storage/LocalStorageProvider";
import IMailProvider from "./Mail/IMailProvider";
import MailProvider from "./Mail/MailProvider";
import S3StorageProvider from "./Storage/S3StorageProvider";

container.registerSingleton<IDateProvider>("DateProvider", DateProvider);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "LocalStorageProvider",
  diskStorage[process.env.DISK]
);

container.registerInstance<IMailProvider>("MailProvider", new MailProvider());

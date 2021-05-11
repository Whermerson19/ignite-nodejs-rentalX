import uploadConfig from "../../../config/upload";

import path from "path";
import fs from "fs";

import IStorageProvider from "./IStorageProvider";

export default class StorageProvider implements IStorageProvider {
  async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.directory, file),
      path.resolve(uploadConfig.uploadFolder, file)
    );

    return file;
  }
}

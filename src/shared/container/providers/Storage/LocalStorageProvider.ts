import path from "path";
import fs from "fs";

import IStorageProvider from "./IStorageProvider";
import uploadConfig from "@shared/config/upload";

export default class LocalStorageProvider implements IStorageProvider {
  async deleteFile(file: string, folder: string): Promise<void> {
    const filename = path.resolve(`${uploadConfig.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    await fs.promises.unlink(filename);
  }

  async saveFile(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(`${uploadConfig.tmpFolder}/${folder}`, file)
    );

    return file;
  }
}

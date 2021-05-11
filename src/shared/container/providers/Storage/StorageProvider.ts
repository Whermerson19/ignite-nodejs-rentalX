
import fs from "fs";


import IStorageProvider from "./IStorageProvider";

export default class StorageProvider implements IStorageProvider {
  async deleteFile(file: string): Promise<void> {
    try {
      await fs.promises.stat(file);
    } catch {
      return;
    }

    await fs.promises.unlink(file);
  }
}

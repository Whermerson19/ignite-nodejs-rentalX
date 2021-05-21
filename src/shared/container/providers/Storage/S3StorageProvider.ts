import { S3 } from "aws-sdk";

import path from "path";
import fs from "fs";

import mime from "mime";

import uploadConfig from "@shared/config/upload";

import IStorageProvider from "./IStorageProvider";

export default class S3StorageProvider implements IStorageProvider {
  private client: S3;
 
  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
        secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY)
      },
    });
  }

  async saveFile(file: string, folder: string): Promise<string> {
    const originalName = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType: ContentType ? ContentType : undefined,
      })
      .promise();

    await fs.promises.unlink(originalName);

    return file;
  }

  async deleteFile(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

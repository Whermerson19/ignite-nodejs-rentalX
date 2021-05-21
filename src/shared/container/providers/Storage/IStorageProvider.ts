export default interface IStorageProvider {
  deleteFile(file: string, folder: string): Promise<void>;
  saveFile(file: string, folder: string): Promise<string>;
}

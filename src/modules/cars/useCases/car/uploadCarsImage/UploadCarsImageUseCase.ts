import { inject, injectable } from "tsyringe";

import ICarsImageRepository from "@modules/cars/repositories/ICarsImageRepository";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import AppError from "@shared/errors/AppError";
import IStorageProvider from "@shared/container/providers/Storage/IStorageProvider";

interface IRequest {
  carId: string;
  carsImage: string[];
}

@injectable()
export default class UploadCarsImageUseCase {

  constructor(
    @inject("CarsImageRepository")
    private carsImageRepository: ICarsImageRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ carId, carsImage }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(carId);
    if (!car) throw new AppError("This car does not exist");

    carsImage.map(async(curr) => {
      await this.carsImageRepository.create(carId, curr)
      await this.storageProvider.saveFile(curr, "cars")
    });
  }
}
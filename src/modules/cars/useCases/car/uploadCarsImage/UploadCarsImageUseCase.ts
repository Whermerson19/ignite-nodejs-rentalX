import { inject, injectable } from "tsyringe";

import CarsImage from "@modules/cars/infra/typeorm/entities/CarsImage";
import ICarsImageRepository from "@modules/cars/repositories/ICarsImageRepository";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import AppError from "@shared/errors/AppError";
import Car from "@modules/cars/infra/typeorm/entities/Car";

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
    private carsRepository: ICarsRepository
  ) {}

  async execute({ carId, carsImage }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(carId);
    if (!car) throw new AppError("This car does not exist");

    carsImage.map(async(curr) => {
      const image = await this.carsImageRepository.create(carId, curr)
    });
  }
}
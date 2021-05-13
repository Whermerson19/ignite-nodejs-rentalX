import { inject, injectable } from "tsyringe";
import Car from "@modules/cars/infra/typeorm/entities/Car";

import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";

import AppError from "@shared/errors/AppError";

@injectable()
export default class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: ICreateCarDTO): Promise<Car> {
    const licensePlateAlreadyExist =
      await this.carsRepository.findByLicensePlate(licensePlate);

    if (licensePlateAlreadyExist)
      throw new AppError("This License Plate already exist");

    const car = await this.carsRepository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    return car;
  }
}

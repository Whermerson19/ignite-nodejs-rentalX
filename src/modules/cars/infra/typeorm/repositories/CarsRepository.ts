import { getRepository, Repository } from "typeorm";

import Car from "../entities/Car";

import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";

export default class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    const car = await this.ormRepository.findOne({ licensePlate });

    return car;
  }

  async create({
    name,
    description,
    brand,
    categoryId,
    dailyRate,
    fineAmount,
    licensePlate
  }: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create({
      name,
      description,
      brand,
      licensePlate,
      categoryId,
      dailyRate,
      fineAmount,
    });

    return this.ormRepository.save(car);
  }
}

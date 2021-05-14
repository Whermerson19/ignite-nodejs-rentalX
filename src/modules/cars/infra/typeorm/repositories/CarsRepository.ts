import { getRepository, Repository } from "typeorm";

import Car from "../entities/Car";

import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";

export default class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = await this.ormRepository.findOne(id);
    return car;
  }

  async findAvailable(
    categoryId?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]> {
    const carsQuery = this.ormRepository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }

    if (categoryId) {
      carsQuery.andWhere("c.categoryId = :categoryId", { categoryId });
    }

    const cars = await carsQuery.getMany();

    return cars;
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
    licensePlate,
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

  async save(car: Car): Promise<Car> {
    return this.ormRepository.save(car);
  }
}

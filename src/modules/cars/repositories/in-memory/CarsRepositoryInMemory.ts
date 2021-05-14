import { uuid } from "uuidv4";

import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "../ICarsRepository";

import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";

export default class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[];

  constructor() {
    this.cars = [];
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = this.cars.find(curr => curr.id === id);
    return car;
  }

  async findAvailable(
    categoryId?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((curr) => {
      if (
        curr.available ||
        (brand && curr.brand === brand) ||
        (name && curr.name === name) ||
        (categoryId && curr.categoryId === categoryId)
      ) {
        return curr;
      }

      return null;
    });
    return cars;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    const car = this.cars.find((curr) => curr.licensePlate === licensePlate);
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
    const car = new Car();

    Object.assign(car, {
      id: uuid(),
      name,
      description,
      brand,
      categoryId,
      dailyRate,
      fineAmount,
      licensePlate,
      available: true,
      createdAt: new Date(),
    });

    this.cars.push(car);

    return car;
  }

  async save(car: Car): Promise<Car> {
    return car;
  }
}

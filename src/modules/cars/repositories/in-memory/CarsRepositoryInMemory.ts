import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "../ICarsRepository";

export default class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

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
      id: String(Math.floor(Math.random() * 32984732)),
      name,
      description,
      brand,
      categoryId,
      dailyRate,
      fineAmount,
      licensePlate,
    });

    this.cars.push(car);

    return car;
  }
}

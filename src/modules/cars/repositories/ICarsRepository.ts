import ICreateCarDTO from "../dtos/ICreateCarDTO";
import Car from "../infra/typeorm/entities/Car";

export default interface ICarsRepository {
  findById(id: string): Promise<Car | undefined>;
  findAvailable(
    categoryId?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
  updateAvailable(id: string, available: boolean): Promise<void>
  create(data: ICreateCarDTO): Promise<Car>;
  save(car: Car): Promise<Car>;
}

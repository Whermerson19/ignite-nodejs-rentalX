import ICreateCarDTO from "../dtos/ICreateCarDTO";
import Car from "../infra/typeorm/entities/Car";

export default interface ICarsRepository {
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
  create(data: ICreateCarDTO): Promise<Car>;
}
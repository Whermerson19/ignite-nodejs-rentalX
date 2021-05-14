import CarsImage from "../infra/typeorm/entities/CarsImage";

export default interface ICarsImageRepository {
  create(carId: string, carImage: string): Promise<CarsImage>;
  save(carImage: CarsImage): Promise<CarsImage>;
}
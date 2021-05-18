import ICreateRentalDTO from "../dtos/ICreateRentalDTO";
import Rental from "../infra/typeorm/entities/Rental";

export default interface IRentalsRepository {
  findById(id: string): Promise<Rental | undefined>;
  findByCar(carId: string): Promise<Rental | undefined>;
  findOpenRentalByUser(userId: string): Promise<Rental | undefined>;
  findRentalsByUser(userId: string): Promise<Rental[]>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  save(rental: Rental): Promise<Rental>;
}
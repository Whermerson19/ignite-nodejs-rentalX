import { getRepository, Repository } from "typeorm";

import Rental from "../entities/Rental";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";

import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";

export default class RentalsRepository implements IRentalsRepository {
  private ormRepository: Repository<Rental>;

  constructor() {
    this.ormRepository = getRepository(Rental);
  }

  async findById(id: string): Promise<Rental | undefined> {
    const rental = await this.ormRepository.findOne(id);
    return rental;
  }
  async findByCar(carId: string): Promise<Rental | undefined> {
    const rental = await this.ormRepository.findOne(carId);

    return rental && rental.endDate === null ? rental : undefined;
  }
  async findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
    const rental = await this.ormRepository.findOne(userId);

    return rental && rental.endDate === null ? rental : undefined;
  }

  async findRentalsByUser(userId: string): Promise<Rental[]> {
    const rentals = await this.ormRepository.find({
      where: {
        userId,
      },
      relations: ["car"]
    });

    return rentals;
  }

  async create({
    carId,
    expectedReturnDate,
    userId,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create({
      carId,
      expectedReturnDate,
      userId,
    });

    return this.ormRepository.save(rental);
  }
  async save(rental: Rental): Promise<Rental> {
    return this.ormRepository.save(rental);
  }
}

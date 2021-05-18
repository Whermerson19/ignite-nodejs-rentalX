import Rental from "@modules/rentals/infra/typeorm/entities/Rental";

import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";

import IRentalsRepository from "../IRentalsRepository";
import { uuid } from "uuidv4";

export default class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async findById(id: string): Promise<Rental | undefined> {
    return this.rentals.find((curr) => curr.id === id);
  }

  async findByCar(carId: string): Promise<Rental | undefined> {
    return this.rentals.find((curr) => curr.carId === carId && !curr.endDate);
  }

  async findRentalsByUser(userId: string): Promise<Rental[]> {
    const rentals = this.rentals.filter((rental) => rental.userId === userId);
    return rentals;
  }

  async findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
    return this.rentals.find((curr) => curr.userId === userId && !curr.endDate);
  }

  async create({
    carId,
    expectedReturnDate,
    userId,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      id: uuid(),
      carId,
      userId,
      expectedReturnDate,
      total: 100,
      startDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async save(rental: Rental): Promise<Rental> {
    return rental;
  }
}

import { injectable, inject } from "tsyringe";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";

import AppError from "@shared/errors/AppError";

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

// @injectable()
export default class CreateRentalUseCase {
  constructor(
    // @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({
    userId,
    carId,
    expectedReturnDate,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findByCar(carId);

    if (carUnavailable) throw new AppError("This car is already rented!");

    const openRentalByUser = await this.rentalsRepository.findOpenRentalByUser(
      userId
    );

    if (openRentalByUser)
      throw new AppError("There's a rental in progress for this user");

    const rental = await this.rentalsRepository.create({
      carId,
      userId,
      expectedReturnDate,
    });

    return rental;
  }
}

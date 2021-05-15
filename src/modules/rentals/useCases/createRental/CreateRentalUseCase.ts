import { inject, injectable } from "tsyringe";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import Rental from "@modules/rentals/infra/typeorm/entities/Rental";

import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import IDateProvider from "@shared/container/providers/Date/IDateProvider";

import AppError from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

@injectable()
export default class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
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

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compare(dateNow, expectedReturnDate);

    if (compare < 24)
      throw new AppError("Invalid return Date, must be 24 hours minimum");

    const rental = await this.rentalsRepository.create({
      carId,
      userId,
      expectedReturnDate,
    });

    return rental;
  }
}

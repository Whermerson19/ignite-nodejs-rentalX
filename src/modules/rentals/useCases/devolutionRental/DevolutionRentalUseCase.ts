import { inject, injectable } from "tsyringe";

import Rental from "@modules/rentals/infra/typeorm/entities/Rental";

import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import IDateProvider from "@shared/container/providers/Date/IDateProvider";

import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
export default class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, userId }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) throw new AppError("Rental does not exist", 404);

    const car = await this.carsRepository.findById(rental.carId);
    if (!car) throw new AppError("This car does not exist", 404);

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.startDate, dateNow);

    if (daily <= 0) daily = 1; // minimum daily

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expectedReturnDate
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fineAmount;
      total = calculate_fine;
    }

    total += daily * car.dailyRate;

    rental.endDate = this.dateProvider.dateNow();
    rental.total = total;

    await this.carsRepository.updateAvailable(car.id, true);

    return this.rentalsRepository.save(rental);
  }
}

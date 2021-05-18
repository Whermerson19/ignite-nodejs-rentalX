import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListRentalByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(userId: string) {
    const rentals = await this.rentalsRepository.findRentalsByUser(userId);

    return rentals;
  }
}
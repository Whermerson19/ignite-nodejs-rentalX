import dayjs from "dayjs";

import RentalsRepositoryInMemory from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";

import DateProvider from "@shared/container/providers/Date/DateProvider";

import CreateRentalUseCase from "./CreateRentalUseCase";

import AppError from "@shared/errors/AppError";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DateProvider;

let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const expectDate = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      carId: "carId",
      userId: "userId",
      expectedReturnDate: expectDate,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("startDate");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        carId: "12345",
        userId: "12345",
        expectedReturnDate: expectDate,
      });

      await createRentalUseCase.execute({
        carId: "98765",
        userId: "12345",
        expectedReturnDate: expectDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        carId: "12345",
        userId: "345436",
        expectedReturnDate: expectDate,
      });

      await createRentalUseCase.execute({
        carId: "12345",
        userId: "234234",
        expectedReturnDate: expectDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return date", async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        carId: "12345",
        userId: "12345",
        expectedReturnDate: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

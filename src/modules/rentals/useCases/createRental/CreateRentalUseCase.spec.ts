import dayjs from "dayjs";

import RentalsRepositoryInMemory from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import DateProvider from "@shared/container/providers/Date/DateProvider";

import CreateRentalUseCase from "./CreateRentalUseCase";

import AppError from "@shared/errors/AppError";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateProvider: DateProvider;

let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const expectDate = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carsRepositoryInMemory,
    );
  });

  it("should be able to create a new rental", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "description",
      brand: "brand",
      fineAmount: 40,
      licensePlate: "test",
      categoryId: "11323",
      dailyRate: 100
    })

    const rental = await createRentalUseCase.execute({
      carId: car.id,
      userId: "userId",
      expectedReturnDate: expectDate,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("startDate");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await expect(async () => {

      const car = await carsRepositoryInMemory.create({
        name: "Car name",
        description: "description",
        brand: "brand",
        fineAmount: 40,
        licensePlate: "test",
        categoryId: "11323",
        dailyRate: 100
      })

      await createRentalUseCase.execute({
        carId: car.id,
        userId: "12345",
        expectedReturnDate: expectDate,
      });

      await createRentalUseCase.execute({
        carId: car.id,
        userId: "12345",
        expectedReturnDate: expectDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await expect(async () => {

      const car = await carsRepositoryInMemory.create({
        name: "Car name",
        description: "description",
        brand: "brand",
        fineAmount: 40,
        licensePlate: "test",
        categoryId: "11323",
        dailyRate: 100
      })

      await createRentalUseCase.execute({
        carId: car.id,
        userId: "345436",
        expectedReturnDate: expectDate,
      });

      await createRentalUseCase.execute({
        carId: car.id,
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

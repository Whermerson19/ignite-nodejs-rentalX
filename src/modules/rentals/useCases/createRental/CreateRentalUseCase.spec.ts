import RentalsRepositoryInMemory from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import CreateRentalUseCase from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      carId: "carId",
      userId: "userId",
      expectedReturnDate: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("startDate");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        carId: "12345",
        userId: "12345",
        expectedReturnDate: new Date(),
      });

      await createRentalUseCase.execute({
        carId: "98765",
        userId: "12345",
        expectedReturnDate: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        carId: "12345",
        userId: "345436",
        expectedReturnDate: new Date(),
      });

      await createRentalUseCase.execute({
        carId: "12345",
        userId: "234234",
        expectedReturnDate: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

});

import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import CreateCarUseCase from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async() => {
    await createCarUseCase.execute({
      name: "Name car",
      description: "Description car",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 50,
      brand: "Brad car",
      categoryId: "CategoryId",
    });
  });

  it("should not be able to create a new car if license plate already exist", () => {
    expect(async() => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Description car",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 50,
        brand: "Brad car",
        categoryId: "CategoryId",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "Description car",
        dailyRate: 100,
        licensePlate: "Other license plate",
        fineAmount: 50,
        brand: "Brad car",
        categoryId: "CategoryId",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

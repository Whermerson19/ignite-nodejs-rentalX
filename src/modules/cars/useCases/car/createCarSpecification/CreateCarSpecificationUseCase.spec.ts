import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import SpecificationsRepositoryInMemory from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase";

import AppError from "@shared/errors/AppError";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a no-existent car", async () => {
    await expect(async () => {
      const carId = "1234";
      const specificationsId = ["1234"];

      await createCarSpecificationUseCase.execute({
        carId,
        specificationsId,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name car",
      description: "Description car",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 50,
      brand: "Brad car",
      categoryId: "CategoryId",
    });

    const specification1 = await specificationsRepositoryInMemory.create({
      name: "specification1 name test",
      description: "specification1 description test",
    });

    const specification2 = await specificationsRepositoryInMemory.create({
      name: "specification2 name test",
      description: "specification2 description test",
    });

    const specificationsId = [specification1.id, specification2.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificationsId,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(2);
  });
});

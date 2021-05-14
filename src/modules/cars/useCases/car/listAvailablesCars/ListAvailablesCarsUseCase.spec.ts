import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import ListAvailablesCarsUseCase from "./ListAvailablesCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailablesCarsUseCase: ListAvailablesCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailablesCarsUseCase = new ListAvailablesCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all availables cars", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      dailyRate: 100,
      licensePlate: "xxx-9999",
      fineAmount: 50,
      brand: "Car brand",
      categoryId: "CategoryID",
    });

    const cars = await listAvailablesCarsUseCase.execute({});

    expect(cars).toEqual([car1]);
  });

  it("should be able to list cars by name", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car1 description",
      dailyRate: 100,
      licensePlate: "xxx-9999",
      fineAmount: 50,
      brand: "Car brand",
      categoryId: "CategoryID",
    });

    const cars = await listAvailablesCarsUseCase.execute({
      name: "Car2",
    });

    expect(cars).toEqual([car1]);
  });

  it("should be able to list cars by brand", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car1 description",
      dailyRate: 100,
      licensePlate: "xxx-9999",
      fineAmount: 50,
      brand: "Car brand",
      categoryId: "CategoryID",
    });

    const cars = await listAvailablesCarsUseCase.execute({
      brand: "Car brand",
    });

    expect(cars).toEqual([car1]);
  });

  it("should be able to list cars by category", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car1 description",
      dailyRate: 100,
      licensePlate: "xxx-9999",
      fineAmount: 50,
      brand: "Car brand",
      categoryId: "CategoryID",
    });

    const cars = await listAvailablesCarsUseCase.execute({
      categoryId: "CategoryID",
    });

    expect(cars).toEqual([car1]);
  });
});

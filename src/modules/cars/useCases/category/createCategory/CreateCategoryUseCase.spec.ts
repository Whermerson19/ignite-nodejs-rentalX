import AppError from "../../../../../shared/errors/AppError";
import CategoriesRepositoryInMemory from "../../../repositories/category/in-memory/CategoriesRepositoryInMemory";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description",
    });

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty("id");
  });

  it("should not be able to create a new category if name already exist", async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: "Category name",
        description: "Category description",
      });

      await createCategoryUseCase.execute({
        name: "Category name",
        description: "Category description",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

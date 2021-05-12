import Category from "@modules/cars/entities/Category";
import ICategoriesRepository from "@modules/cars/repositories/category/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.index();
    return categories;
  }
}

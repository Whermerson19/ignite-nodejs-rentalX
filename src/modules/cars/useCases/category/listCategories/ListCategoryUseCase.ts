import Category from "@modules/cars/infra/typeorm/entities/Category";
import ICategoriesRepository from "@modules/cars/repositories/ICategoriesRepository";
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

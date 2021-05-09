import { inject, injectable } from "tsyringe";
import Category from "../../../entities/Category";
import ICategoriesRepository from "../../../repositories/category/ICategoriesRepository";

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

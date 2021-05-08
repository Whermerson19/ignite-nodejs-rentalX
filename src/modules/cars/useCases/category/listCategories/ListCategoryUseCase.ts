import Category from "../../../entities/Category";
import ICategoriesRepository from "../../../repositories/category/ICategoriesRepository";

export default class ListCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.index();
    return categories;
  }
}

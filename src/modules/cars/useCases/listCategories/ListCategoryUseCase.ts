import Category from "../../model/Category";
import ICategoriesRepository from "../../repositories/category/ICategoriesRepository";

export default class ListCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.index();
    return categories;
  }
}

import Category from "../../../entities/Category";
import ICategoriesRepository from "../../../repositories/category/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryAlreadyExist = await this.categoriesRepository.findByName(name);
    if (categoryAlreadyExist) throw new Error("This category already exist");

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}

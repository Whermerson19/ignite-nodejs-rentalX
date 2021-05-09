import { inject, injectable } from "tsyringe";
import Category from "../../../entities/Category";
import ICategoriesRepository from "../../../repositories/category/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryAlreadyExist = await this.categoriesRepository.findByName(
      name
    );
    if (categoryAlreadyExist) throw new Error("This category already exist");

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}

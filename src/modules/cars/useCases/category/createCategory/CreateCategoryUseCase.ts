import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import ICategoriesRepository from "@modules/cars/repositories/ICategoriesRepository";
import Category from "@modules/cars/infra/typeorm/entities/Category";

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
    if (categoryAlreadyExist) throw new AppError("This category already exist");

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}

import ICategoriesRepository from "../../repositories/category/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExist = this.categoriesRepository.findByName(name);
    if (categoryAlreadyExist) throw new Error("This category already exist");

    this.categoriesRepository.create({
      name,
      description,
    });
  }
}

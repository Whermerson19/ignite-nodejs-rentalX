import ICreateCategoryDTO from "../../../dtos/ICreateCategoryDTO";
import Category from "../../../entities/Category";
import ICategoryRepository from "../ICategoriesRepository";

export default class CategoriesRepositoryInMemory
  implements ICategoryRepository
{
  categories: Category[] = [];

  async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find((curr) => curr.name === name);
    return category;
  }
  async index(): Promise<Category[]> {
    return this.categories;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      id: Math.floor(Math.random() * 5434634756253),
      name,
      description,
      createdAt: new Date(),
    });

    this.categories.push(category);

    return category;
  }
  async save(category: Category): Promise<Category> {
    return category;
  }
}
4;

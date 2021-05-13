import { uuid } from "uuidv4";
import ICreateCategoryDTO from "../../dtos/ICreateCategoryDTO";
import Category from "../../infra/typeorm/entities/Category";
import ICategoryRepository from "../ICategoriesRepository";

export default class CategoriesRepositoryInMemory
  implements ICategoryRepository
{
  categories: Category[];

  constructor() {
    this.categories = [];
  }

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
      id: uuid(),
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

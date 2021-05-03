import Category from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export default class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date()
    });

    this.categories.push(category);
  }

  index(): Category[] {
    return this.categories
  }

  findByName(name: string): Category | undefined {
    const category = this.categories.find(category => category.name === name);
    return category;
  }
}
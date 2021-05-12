import Category from "../infra/typeorm/entities/Category";

import ICreateCategoryDTO from "../dtos/ICreateCategoryDTO"

export default interface ICategoryRepository {
  findByName(name: string): Promise<Category | undefined>;
  index(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
}

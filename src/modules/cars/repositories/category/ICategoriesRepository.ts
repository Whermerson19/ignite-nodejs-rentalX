import Category from "../../entities/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export default interface ICategoryRepository {
  findByName(name: string): Promise<Category | undefined>;
  index(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
}

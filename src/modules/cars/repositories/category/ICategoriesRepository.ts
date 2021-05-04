import Category from "../model/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export default interface ICategoryRepository {
  findByName(name: string): Category | undefined;
  index(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

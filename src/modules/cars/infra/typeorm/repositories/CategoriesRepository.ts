import ICreateCategoryDTO from "@modules/cars/dtos/ICreateCategoryDTO";
import ICategoriesRepository from "@modules/cars/repositories/ICategoriesRepository";
import { getRepository, Repository } from "typeorm";

import Category from "../entities/Category";


export default class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  private static INSTANCE: CategoriesRepository;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({
      name,
      description,
    });

    return this.ormRepository.save(category);
  }

  async index(): Promise<Category[]> {
    return this.ormRepository.find();
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return category;
  }

  async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }
}

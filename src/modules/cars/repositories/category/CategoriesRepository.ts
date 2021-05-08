import { getRepository, Repository } from "typeorm";

import Category from "../../entities/Category";
import ICategoriesRepository, {
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

export default class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  private static INSTANCE: CategoriesRepository;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }

  //   return CategoriesRepository.INSTANCE;
  // }

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

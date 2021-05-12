import ICreateSpecificationDTO from "@modules/cars/dtos/ICreateSpecificationDTO";
import ISpecificationsRepository from "@modules/cars/repositories/ISpecificationsRepository";
import { getRepository, Repository } from "typeorm";

import Specification from "../entities/Specification";


export default class SpecificationsRepository
  implements ISpecificationsRepository {
  private specificationsRepostiory: Repository<Specification>;

  constructor() {
    this.specificationsRepostiory = getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.specificationsRepostiory.findOne({ name });
    return specification;
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.specificationsRepostiory.create({
      name,
      description,
    });

    return this.specificationsRepostiory.save(specification);
  }

  async index(): Promise<Specification[]> {
    return this.specificationsRepostiory.find();
  }

  async save(specification: Specification): Promise<Specification> {
    return this.specificationsRepostiory.save(specification);
  }
}

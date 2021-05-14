import ICreateSpecificationDTO from "@modules/cars/dtos/ICreateSpecificationDTO";
import Specification from "@modules/cars/infra/typeorm/entities/Specification";
import { uuid } from "uuidv4";
import ISpecificationsRepository from "../ISpecificationsRepository";

export default class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository
{
  private specifications: Specification[] = [];

  async findByIds(ids: string[]): Promise<Specification[] | undefined> {
    const indexIds = this.specifications.filter((curr) =>
      ids.includes(curr.id)
    );

    return indexIds;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.specifications.find(
      (curr) => curr.name === name
    );
    return specification;
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      id: uuid(),
      name,
      description,
      createdAt: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }

  async index(): Promise<Specification[]> {
    return this.specifications;
  }

  async save(specification: Specification): Promise<Specification> {
    return specification;
  }
}

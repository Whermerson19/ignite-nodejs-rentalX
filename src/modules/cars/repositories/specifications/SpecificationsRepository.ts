import Specification from "../../model/Specification";
import ISpecificationsRepository, { ICreateSpecificationDTO } from "./ISpecificationsRepository";

export default class SpecificationsRepository implements ISpecificationsRepository {
  
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }
  
  findByName(name: string): Specification | undefined {
    const specification = this.specifications.find(specification => specification.name === name);
    return specification;
  }
  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      id: Math.floor(Math.random() * 34567823658).toString(),
      name,
      description,
      createdAt: new Date()
    });

    this.specifications.push(specification);
  }
  index(): Specification[] {
    throw new Error("Method not implemented.");
  }

}
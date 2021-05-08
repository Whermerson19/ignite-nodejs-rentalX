import Specification from "../../entities/Specification";

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export default interface ISpecificationsRepository {
  findByName(name: string): Specification | undefined;
  create({ name, description }: ICreateSpecificationDTO): void;
  index(): Specification[];
}
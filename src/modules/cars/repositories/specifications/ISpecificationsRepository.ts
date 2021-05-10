import Specification from "../../entities/Specification";
import ICreateSpecificationDTO from "../../dtos/ICreateSpecificationDTO";

export default interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification | undefined>;
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification>;
  index(): Promise<Specification[]>;
  save(specification: Specification): Promise<Specification>;
}

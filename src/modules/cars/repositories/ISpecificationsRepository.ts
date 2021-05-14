import Specification from "../infra/typeorm/entities/Specification";
import ICreateSpecificationDTO from "../dtos/ICreateSpecificationDTO";

export default interface ISpecificationsRepository {
  findByIds(ids: string[]): Promise<Specification[] | undefined>;
  findByName(name: string): Promise<Specification | undefined>;
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification>;
  index(): Promise<Specification[]>;
  save(specification: Specification): Promise<Specification>;
}

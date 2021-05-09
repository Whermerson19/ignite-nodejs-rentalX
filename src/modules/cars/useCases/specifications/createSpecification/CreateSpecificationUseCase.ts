import Specification from "../../../entities/Specification";
import ISpecificationsRepository from "../../../repositories/specifications/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExist = await this.specificationRepository.findByName(
      name
    );

    if (specificationAlreadyExist) {
      throw new Error("This specification already exist");
    }

    const specification = await this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}

import ISpecificationsRepository from "../../../repositories/specifications/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest) {
    const specificationAlreadyExist = this.specificationRepository.findByName(
      name
    );

    if (specificationAlreadyExist) {
      throw new Error("This specification already exist");
    }
    
    this.specificationRepository.create({
      name,
      description,
    });
  }
}
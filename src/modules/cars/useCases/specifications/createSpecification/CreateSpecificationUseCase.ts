import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import ISpecificationsRepository from "@modules/cars/repositories/ISpecificationsRepository";
import Specification from "@modules/cars/infra/typeorm/entities/Specification";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExist =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExist) {
      throw new AppError("This specification already exist", 403);
    }

    const specification = await this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}

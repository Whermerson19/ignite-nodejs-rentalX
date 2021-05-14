import ICarsImageRepository from "@modules/cars/repositories/ICarsImageRepository";
import { getRepository, Repository } from "typeorm";
import CarsImage from "../entities/CarsImage";

export default class CarsImageRepository implements ICarsImageRepository {
  private ormRepository: Repository<CarsImage>;

  constructor() {
    this.ormRepository = getRepository(CarsImage);
  }

  async create(carId: string, carImage: string): Promise<CarsImage> {
    const image = this.ormRepository.create({
      carId,
      carImage,
    });

    return this.ormRepository.save(image);
  }

  async save(carImage: CarsImage): Promise<CarsImage> {
    return this.ormRepository.save(carImage);
  }
}

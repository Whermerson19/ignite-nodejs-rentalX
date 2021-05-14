import { Request, Response } from "express";
import { container } from "tsyringe";
import UploadCarsImageUseCase from "./UploadCarsImageUseCase";


interface IFiles {
  filename: string;
}

export default class UploadCarsImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const uploadCarsImageUseCase = container.resolve(UploadCarsImageUseCase);

    const { carId } = request.params;
    const images = request.files as IFiles[];

    const paths = images.map(file => file.filename);

    await uploadCarsImageUseCase.execute({
      carId,
      carsImage: paths
    });

    return response.status(201).send()
  }
}
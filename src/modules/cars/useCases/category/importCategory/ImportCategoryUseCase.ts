import fs from "fs";
import csvParse from "csv-parse";
import CategoriesRepository from "../../../repositories/category/CategoriesRepository";
import { inject, injectable } from "tsyringe";

interface ICategoryImport {
  name: string;
  description: string;
}

@injectable()
export default class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: CategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<ICategoryImport[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const categories: ICategoryImport[] = [];

      const parseFile = csvParse(); //vai ler linha por linha, (vírgula) como separador padrão

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = await this.categoryRepository.findByName(name);

      if (!existCategory) {
        await this.categoryRepository.create({
          name,
          description,
        });
      }
    });
  }
}

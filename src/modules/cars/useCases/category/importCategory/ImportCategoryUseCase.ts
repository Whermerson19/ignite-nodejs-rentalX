import fs from "fs";
import csvParse from "csv-parse";
import CategoriesRepository from "../../../repositories/category/CategoriesRepository";

interface ICategoryImport {
  name: string;
  description: string;
}

export default class ImportCategoryUseCase {
  constructor(private categoryRepository: CategoriesRepository) {}

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
        .on("end", () => resolve(categories))
        .on("error", (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map((category) => {
      const { name, description } = category;

      const existCategory = this.categoryRepository.findByName(name);

      if (!existCategory) {
        this.categoryRepository.create({
          name,
          description,
        })
      }
    });
  }
}

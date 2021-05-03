import { Router } from "express";
import CategoriesRepository from "../repositories/CategoriesRepository";

const categoriesRouter = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouter.post("/", (request, response) => {
  const { name, description } = request.body;

  const categoryAlreadyExist = categoriesRepository.findByName(name);
  if (categoryAlreadyExist) {
    return response.status(400).json({ error: "This category already exist" });
  }

  categoriesRepository.create({ name, description });

  return response.status(201).send();
});

categoriesRouter.get("/", (request, response) => {
  const list = categoriesRepository.index();

  return response.status(200).json(list);
});

export default categoriesRouter;

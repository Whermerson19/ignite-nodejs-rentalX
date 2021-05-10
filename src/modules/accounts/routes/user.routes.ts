import { Router } from "express";

import CreateUserController from "../useCases/users/createUser/CreateUserController";

const userRouter = Router();

const createUserController = new CreateUserController();

userRouter.post("/", createUserController.handle);

export default userRouter;

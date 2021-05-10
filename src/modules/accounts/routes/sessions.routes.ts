import { Router } from "express";
import AuthenticateUserController from "../useCases/users/authenticateUser/AuthenticateUserController";

const sessionsRouter = Router();

const authenticateUserController = new AuthenticateUserController();

sessionsRouter.post("/", authenticateUserController.handle);

export default sessionsRouter;

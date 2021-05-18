import { Router } from "express";
import AuthenticateUserController from "@modules/accounts/useCases/users/authenticateUser/AuthenticateUserController";
import CreateRefreshTokenController from "@modules/accounts/useCases/usersTokens/createRefreshToken/CreateRefreshTokenController";

const sessionsRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const createRefreshTokenController = new CreateRefreshTokenController();

sessionsRouter.post("/", authenticateUserController.handle);
sessionsRouter.post("/refresh-token", createRefreshTokenController.handle);

export default sessionsRouter;

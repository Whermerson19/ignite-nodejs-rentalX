import SendForgotPasswordMailController from "@modules/accounts/useCases/passwords/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRouter.post(
  "/forgot-password",
  sendForgotPasswordMailController.handle
);

export default passwordRouter;

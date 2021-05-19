import ResetPasswordController from "@modules/accounts/useCases/passwords/resetPassword/ResetPasswordController";
import SendForgotPasswordMailController from "@modules/accounts/useCases/passwords/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  "/forgot",
  sendForgotPasswordMailController.handle
);

passwordRouter.post(
  "/reset/:token",
  resetPasswordController.handle
);

export default passwordRouter;

import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import CreateUserController from "@modules/accounts/useCases/users/createUser/CreateUserController";
import UpdateUserAvatarController from "@modules/accounts/useCases/users/updateUserAvatar/UpdateUserAvatarController";

import uploadConfig from "@shared/config/upload";
import ListUserController from "@modules/accounts/useCases/users/listUser/ListUserController";

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig);

const listUserController = new ListUserController();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.get("/profile", ensureAuthenticated, listUserController.handle);

usersRouter.post("/", createUserController.handle);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatarFile"), 
  updateUserAvatarController.handle
);

export default usersRouter;

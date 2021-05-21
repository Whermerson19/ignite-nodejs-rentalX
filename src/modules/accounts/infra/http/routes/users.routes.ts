import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import CreateUserController from "@modules/accounts/useCases/users/createUser/CreateUserController";
import UpdateUserAvatarController from "@modules/accounts/useCases/users/updateUserAvatar/UpdateUserAvatarController";

import uploadConfig from "@shared/config/upload";


const usersRouter = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post("/", createUserController.handle);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single('avatarFile'),
  updateUserAvatarController.handle
);

export default usersRouter;

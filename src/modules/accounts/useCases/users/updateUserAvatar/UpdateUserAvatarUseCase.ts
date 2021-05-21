import { inject, injectable } from "tsyringe";
import User from "@modules/accounts/infra/typeorm/entities/User";

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IStorageProvider from "@shared/container/providers/Storage/IStorageProvider";

import AppError from "@shared/errors/AppError";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
export default class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError("This user does not exist", 401);

    if (user.avatar)
      await this.storageProvider.deleteFile(user.avatar, "avatar");

    const file = await this.storageProvider.saveFile(avatarFile, "avatar");

    user.avatar = file;

    return this.usersRepository.save(user);
  }
}

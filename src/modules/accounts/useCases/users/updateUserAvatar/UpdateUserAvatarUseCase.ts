import { inject, injectable } from "tsyringe";
import User from "@modules/accounts/entities/User";

import IUsersRepository from "@modules/accounts/repositories/users/IUsersRepository";
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
      await this.storageProvider.deleteFile(`./tmp/avatar/${user.avatar}`);

    user.avatar = avatarFile;

    return this.usersRepository.save(user);
  }
}

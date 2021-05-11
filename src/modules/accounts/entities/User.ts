import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Exclude, Expose } from "class-transformer";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  driverLicense: string;

  @Column()
  avatar: string;

  @Column("boolean")
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Expose({ name: "avatarURL" })
  getAvatarUrl(): string | null {
    return this.avatar ? `http://localhost:3333/files/${this.avatar}` : null;
  }
}

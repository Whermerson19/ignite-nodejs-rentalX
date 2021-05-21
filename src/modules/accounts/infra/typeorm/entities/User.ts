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
    switch (process.env.DISK) {
      case "local":
        return `${process.env.APP_API_LOCAL}/files/avatar/${this.avatar}`;
      case "s3":
        return `${process.env.AWS_IMAGES_URL}avatar/${this.avatar}`;
      default:
        return null;
    }
  }
} 

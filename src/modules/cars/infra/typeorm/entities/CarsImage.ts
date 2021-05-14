import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("cars_image")
export default class CarsImage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  carId: string;

  @Column()
  carImage: string;

  @CreateDateColumn()
  createdAt: Date;
}

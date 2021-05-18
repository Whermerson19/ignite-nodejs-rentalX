import Car from "@modules/cars/infra/typeorm/entities/Car";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("rentals")
export default class Rental {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'carId' })
  car: Car

  @Column()
  carId: string;

  @Column()
  userId: string;

  @Column("timestamp")
  startDate: Date;

  @Column("timestamp")
  endDate: Date;

  @Column("timestamp")
  expectedReturnDate: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

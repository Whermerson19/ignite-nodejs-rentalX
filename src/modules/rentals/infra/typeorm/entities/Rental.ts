import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("rentals")
export default class Rental {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

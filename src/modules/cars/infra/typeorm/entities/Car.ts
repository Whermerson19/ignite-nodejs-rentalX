import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("cars")
export default class Car {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("numeric")
  dailyRate: number;

  @Column("bool")
  available: boolean;

  @Column()
  licensePlate: string;

  @Column("numeric")
  fineAmount: number;

  @Column()
  brand: string;

  @Column()
  categoryId: string;

  @CreateDateColumn()
  createdAt: Date;
}

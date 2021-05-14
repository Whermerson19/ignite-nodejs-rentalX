import { Entity } from "typeorm";

// @Entity('rentals')
export default class Rental {
  id: string;

  carId: string;

  userId: string;

  startDate: Date;

  endDate: Date;

  expectedReturnDate: Date;

  total: number;

  createdAt: Date;

  updatedAt: Date;
}
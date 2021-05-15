import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRentals1621019774540 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rentals",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "carId",
            type: "varchar",
          },
          {
            name: "userId",
            type: "varchar",
          },
          {
            name: "startDate",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "endDate",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "expectedReturnDate",
            type: "timestamp",
          },
          {
            name: "total",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKCarRental",
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            columnNames: ["carId"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKUserRental",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["userId"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("rentals");
  }
}

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSpecificationsCars1620990577757
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_cars",
        columns: [
          {
            name: "carId",
            type: "varchar",
          },
          {
            name: "specificationId",
            type: "varchar",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKSpecificationCar",
            columnNames: ["specificationId"],
            referencedTableName: "specifications",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKCarSpecification",
            columnNames: ["carId"],
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("specifications_cars");
  }
}

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TreeLevelColumn,
} from "typeorm";

export class CreateUsersToken1621358472993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_tokens",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "varchar",
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "refresh_token",
            type: "varchar",
          },
          {
            name: "userId",
            type: "varchar",
          },
          {
            name: "expires_date",
            type: "timestamp",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUsersToken",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["userId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_tokens");
  }
}

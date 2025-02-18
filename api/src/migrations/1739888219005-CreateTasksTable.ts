import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1739888219005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE "task_status" AS ENUM ('pending', 'in_progress', 'completed');

        CREATE TABLE "task" (
          "id" SERIAL PRIMARY KEY,
          "title" varchar(255) NOT NULL,
          "description" varchar(255),
          "status" "task_status" DEFAULT 'pending' NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TYPE "task_status";

      DROP TABLE "tasks";
    `)
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1718886932702 implements MigrationInterface {
    name = 'Init1718886932702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "firs_name" TO "first_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "first_name" TO "firs_name"`);
    }

}

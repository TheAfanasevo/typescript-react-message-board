import {MigrationInterface, QueryRunner} from "typeorm";

export class newest1600354409120 implements MigrationInterface {
    name = 'newest1600354409120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_user" DROP COLUMN "testMigrations"`);
        await queryRunner.query(`ALTER TABLE "board_user" ALTER COLUMN "tokenVersion" SET DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_user" ALTER COLUMN "tokenVersion" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "board_user" ADD "testMigrations" integer NOT NULL`);
    }

}

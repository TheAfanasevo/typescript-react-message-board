import {MigrationInterface, QueryRunner} from "typeorm";

export class newest1600268660107 implements MigrationInterface {
    name = 'newest1600268660107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_user" ADD "tokenVersion" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board_user" ADD "testMigrations" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_user" DROP COLUMN "testMigrations"`);
        await queryRunner.query(`ALTER TABLE "board_user" DROP COLUMN "tokenVersion"`);
    }

}

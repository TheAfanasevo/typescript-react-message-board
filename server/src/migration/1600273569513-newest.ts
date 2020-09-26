import {MigrationInterface, QueryRunner} from "typeorm";

export class newest1600273569513 implements MigrationInterface {
    name = 'newest1600273569513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board_user" ADD CONSTRAINT "UQ_057e8b3b5e249a5258e266bee5e" UNIQUE ("email")`);
        await queryRunner.query(`CREATE TYPE "board_user_group_enum" AS ENUM('admin', 'basic')`);
        await queryRunner.query(`ALTER TABLE "board_user" ADD "group" "board_user_group_enum" NOT NULL DEFAULT 'basic'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_user" DROP COLUMN "group"`);
        await queryRunner.query(`DROP TYPE "board_user_group_enum"`);
        await queryRunner.query(`ALTER TABLE "board_user" DROP CONSTRAINT "UQ_057e8b3b5e249a5258e266bee5e"`);
        await queryRunner.query(`ALTER TABLE "board_user" DROP COLUMN "email"`);
    }

}

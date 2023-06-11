import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1686461223578 implements MigrationInterface {
    name = 'CreateUsers1686461223578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL COMMENT 'パスワード'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
    }

}

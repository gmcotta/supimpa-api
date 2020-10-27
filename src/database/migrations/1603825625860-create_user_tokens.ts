import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createUserTokens1603825625860
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'user-tokens',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'token',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'integer',
            unsigned: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('user-tokens');
  }
}

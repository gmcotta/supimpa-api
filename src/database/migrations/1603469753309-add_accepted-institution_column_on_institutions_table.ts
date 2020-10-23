import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addAcceptedInstitutionColumnOnInstitutionsTable1603469753309
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'institutions',
      new TableColumn({
        name: 'accepted',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('institutions', 'accepted');
  }
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin-users')
export default class AdminUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

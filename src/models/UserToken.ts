import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user-tokens')
export default class UserToken {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  token: string;

  @Column()
  user_id: number;
}

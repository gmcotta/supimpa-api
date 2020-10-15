import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('institutions')
export default class Institution {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  retirement_or_center: string;

  @Column()
  about: string;

  @Column()
  phone: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Image from './Image';

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

  @Column()
  accepted: boolean;

  @OneToMany(() => Image, image => image.institution, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'institution_id' })
  images: Image[];
}

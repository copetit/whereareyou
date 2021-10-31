import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Posting } from './posting.entity';

@Entity()
export class LocationInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @OneToOne(() => Posting)
  @JoinColumn()
  PostingNum: number;
}

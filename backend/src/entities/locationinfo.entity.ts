import { Entity, Column, OneToOne, ObjectIdColumn, JoinColumn } from 'typeorm';
import { Posting } from './posting.entity';

@Entity()
export class LocationInfo {
  @ObjectIdColumn()
  id: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @OneToOne(() => Posting)
  @JoinColumn()
  PostingNum: number;
}

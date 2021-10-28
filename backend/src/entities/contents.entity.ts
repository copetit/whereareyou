import { Entity, Column, OneToOne, ObjectIdColumn, JoinColumn } from 'typeorm';
import { Posting } from './posting.entity';

@Entity()
export class Contents {
  @ObjectIdColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  videoUrl: string;

  @OneToOne(() => Posting)
  @JoinColumn()
  PostingNum: number;
}

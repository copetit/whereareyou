import { Entity, Column, ObjectIdColumn, OneToOne, JoinColumn } from 'typeorm';
import { Posting } from './posting.entity';

@Entity()
export class User {
  @ObjectIdColumn()
  id: number;

  @Column()
  Password: string;

  @Column()
  MailAddress: string;

  @OneToOne(() => Posting)
  @JoinColumn()
  PostingNum: number;
}
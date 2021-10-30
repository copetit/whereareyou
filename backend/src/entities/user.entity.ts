import { Entity, Column, OneToOne, JoinColumn, ObjectIdColumn } from 'typeorm';
import { Posting } from './posting.entity';

@Entity()
export class User {
  @ObjectIdColumn()
  id: number;

  @Column()
  Password: string;

  @Column()
  MailAddress: string;

  @OneToOne((type) => Posting)
  @JoinColumn()
  PostingNum: number;
}

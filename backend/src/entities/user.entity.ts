import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Posting } from './posting.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Password: string;

  @Column()
  MailAddress: string;

  @OneToOne(() => Posting)
  @JoinColumn()
  PostingNum: number;
}

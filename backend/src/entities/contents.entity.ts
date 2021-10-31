import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Posting } from './posting.entity';

@Entity()
export class Contents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  videoUrl: string;

  @OneToOne(() => Posting)
  @JoinColumn()
  posting: Posting;
}

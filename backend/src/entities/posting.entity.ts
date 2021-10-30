import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Posting {
  @ObjectIdColumn()
  id: number;

  @Column()
  PostingNum: number;

  @Column()
  PetName: string;

  @Column({ nullable: true })
  PetSex: string;

  @Column({ nullable: true })
  PetAge: number;

  @Column()
  PetInfo: string;

  @Column({ nullable: true })
  Detail: string;

  @Column()
  LostDate: Date;

  @Column()
  Address: string;

  @CreateDateColumn()
  CreatedDate: Date;

  @UpdateDateColumn()
  UpdateDate: Date;
}

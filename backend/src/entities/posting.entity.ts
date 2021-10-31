import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Posting {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

import { CoreEntity } from 'src/common/entities/core.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Contents } from './contents.entity';
import { LocationInfo } from './locationinfo.entity';
import { User } from './user.entity';

@Entity()
export class Posting extends CoreEntity {
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

  @OneToOne(() => LocationInfo)
  @JoinColumn()
  locationinfo: LocationInfo;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Contents)
  @JoinColumn()
  contents: Contents;
}

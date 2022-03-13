import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    default: 'eeevee',
  })
  @Column()
  PetName: string;

  @ApiProperty({
    default: '不明',
  })
  @Column({ nullable: true })
  PetSex: string;

  @ApiProperty({
    default: '1',
  })
  @Column({ nullable: true })
  PetAge: number;

  @ApiProperty({
    default: 'かわいい',
  })
  @Column()
  PetInfo: string;

  @ApiProperty({
    default: 'ふわふわなしっぽ',
  })
  @Column({ nullable: true })
  Detail: string;

  @ApiProperty({
    default: '2021-12-09',
  })
  @Column()
  LostDate: Date;

  @ApiProperty({
    default: 'address',
  })
  @Column()
  Address: string;

  @ApiProperty({
    default: '2021-12-11',
  })
  @CreateDateColumn()
  CreatedDate: Date;

  @ApiProperty({
    default: '2021-12-11',
  })
  @UpdateDateColumn()
  UpdateDate: Date;

  @ApiProperty({
    default: {
      lat: 35.73805386139952,
      lng: 139.6538817110336,
    },
  })
  @OneToOne(() => LocationInfo)
  @JoinColumn()
  locationinfo: LocationInfo;

  @ApiProperty({
    default: {
      Password: '12345678',
      MailAddress: 'eevee@thunder.com',
    },
  })
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ApiProperty({
    default: {
      imageUrl: 'dummyImage@dummy.com,dummyImage2@dummy.com',
      videoUrl: 'dummyVideo@dummy.com,dummyVideo2@dummy.com',
    },
  })
  @OneToOne(() => Contents)
  @JoinColumn()
  contents: Contents;
}

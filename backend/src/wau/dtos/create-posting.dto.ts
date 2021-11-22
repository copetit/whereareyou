import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { LocationInfo } from '../entities/locationinfo.entity';
import { Contents } from '../entities/contents.entity';
import { CoreOutput } from './output.dto';

export class CreatePostingDto {
  @ApiProperty({
    default: 'eeevee',
  })
  PetName: string;

  @ApiProperty({
    default: '不明',
  })
  PetSex?: string;

  @ApiProperty({
    default: '1',
  })
  PetAge?: number;

  @ApiProperty({
    default: 'かわいい',
  })
  PetInfo: string;

  @ApiProperty({
    default: 'ふわふわなしっぽ',
  })
  Detail?: string;

  @ApiProperty({
    default: '2021-12-09',
  })
  LostDate: Date;

  @ApiProperty({
    default: 'hogehoge',
  })
  Address: string;

  @ApiProperty({
    default: '2021-12-11',
  })
  CreatedDate: Date;

  @ApiProperty({
    default: '2021-12-11',
  })
  UpdateDate: Date;

  @ApiProperty({
    default: {},
  })
  locationinfo: LocationInfo;

  @ApiProperty({
    default: {},
  })
  user: User;

  @ApiProperty({
    default: {},
  })
  contents: Contents;
}

export class CreatePostingOutput extends CoreOutput {
  id?: number;
}

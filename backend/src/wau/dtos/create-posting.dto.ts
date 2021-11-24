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
    default: {
      lat: 35.73805386139952,
      lng: 139.6538817110336,
    },
  })
  locationinfo: LocationInfo;

  @ApiProperty({
    default: {
      Password: '12345678',
      MailAddress: 'eevee@thunder.com',
    },
  })
  user: User;

  @ApiProperty({
    default: {
      imageUrl: "['dummyImage@dummy.com', 'dummyImage2@dummy.com']",
      videoUrl: "['dummyVideo@dummy.com', 'dummyVideo2@dummy.com']",
    },
  })
  contents: Contents;
}

export class CreatePostingOutput extends CoreOutput {
  id?: number;
}

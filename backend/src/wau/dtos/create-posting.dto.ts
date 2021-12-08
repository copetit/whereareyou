import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from './output.dto';
import { CreateLocationInfoDto } from './create-locationInfo.dto';
import { CreateUserDto } from './create-user.dto';
import { CreateContentsDto } from './create-contents.dto';
import { IsDateString, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostingDto {
  @ApiProperty({
    default: 'eeevee',
  })
  PetName: string;

  @ApiProperty({
    default: '不明',
  })
  PetSex?: string;

  @Max(100)
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

  @IsDateString()
  @ApiProperty({
    default: '2021-12-09',
  })
  LostDate: Date;

  @ApiProperty({
    default: 'hogehoge',
  })
  Address: string;

  @IsDateString()
  @ApiProperty({
    default: '2021-12-11',
  })
  CreatedDate: Date;

  @IsDateString()
  @ApiProperty({
    default: '2021-12-11',
  })
  UpdateDate: Date;

  @ValidateNested({ each: true })
  @ApiProperty({
    default: {
      lat: 35.73805386139952,
      lng: 139.6538817110336,
    },
  })
  @Type(() => CreateLocationInfoDto)
  locationinfo: CreateLocationInfoDto;

  @ValidateNested({ each: true })
  @ApiProperty({
    default: {
      Password: '12345678',
      MailAddress: 'eevee@thunder.com',
    },
  })
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @ApiProperty({
    default: {
      imageUrl: "['dummyImage@dummy.com', 'dummyImage2@dummy.com']",
      videoUrl: "['dummyVideo@dummy.com', 'dummyVideo2@dummy.com']",
    },
  })
  contents: CreateContentsDto;
}

export class CreatePostingOutput extends CoreOutput {
  id?: number;
}

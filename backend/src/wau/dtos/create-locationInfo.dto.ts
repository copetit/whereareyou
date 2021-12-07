import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude } from 'class-validator';

export class CreateLocationInfoDto {
  @IsLatitude()
  @ApiProperty({
    default: 35.73805386139952,
  })
  lat: number;

  @IsLongitude()
  @ApiProperty({
    default: 139.6538817110336,
  })
  lng: number;
}

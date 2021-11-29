import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationInfoDto {
  @ApiProperty({
    default: 35.73805386139952,
  })
  lat: number;
  @ApiProperty({
    default: 139.6538817110336,
  })
  lng: number;
}

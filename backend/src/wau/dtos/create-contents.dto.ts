import { ApiProperty } from '@nestjs/swagger';

export class CreateContentsDto {
  @ApiProperty({
    default: "['dummyImage@dummy.com', 'dummyImage2@dummy.com']",
  })
  imageUrl: string[];
  @ApiProperty({
    default: "['dummyVideo@dummy.com', 'dummyVideo2@dummy.com']",
  })
  videoUrl: string[];
}

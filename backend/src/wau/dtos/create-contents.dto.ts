import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from './output.dto';

export class CreateContentsDto {
  @ApiProperty({
    default: 'dummyImage@dummy.com,dummyImage2@dummy.com',
  })
  imageUrl: string[];

  @ApiProperty({
    default: 'dummyVideo@dummy.com,dummyVideo2@dummy.com',
  })
  videoUrl: string[];
}

export class CreateContentsOutput extends CoreOutput {
  id?: number;
}

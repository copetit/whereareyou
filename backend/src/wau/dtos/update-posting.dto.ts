import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostingDto, CreatePostingOutput } from './create-posting.dto';

export class UpdatePostingDto extends PartialType(CreatePostingDto) {
  @ApiProperty({
    default: 1,
  })
  id: number;
}

export class UpdatePostingOutput extends CreatePostingOutput {}

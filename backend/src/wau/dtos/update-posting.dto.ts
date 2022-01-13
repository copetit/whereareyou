import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostingDto, CreatePostingOutput } from './create-posting.dto';

export class UpdatePostingDto extends PartialType(CreatePostingDto) {
  id: number;
}

export class UpdatePostingOutput extends CreatePostingOutput {}

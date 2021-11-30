import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WauService } from './wau.service';
import { Posting } from './entities/posting.entity';
import { LocationInfo } from './entities/locationinfo.entity';
import { CreatePostingDto } from './dtos/create-posting.dto';

@Controller('v1/wau')
export class WauController {
  constructor(private readonly wauService: WauService) {}

  @Get('posting/:id')
  getPostingById(@Param('id') id: string): Promise<Posting[]> {
    return this.wauService.getPostingById(id);
  }

  @Get('locations')
  async getLocationinfo(): Promise<LocationInfo[]> {
    return this.wauService.getLocationInfo();
  }

  @Post('posting')
  @UsePipes(new ValidationPipe({ transform: true }))
  createPosting(@Body() createPostingDto: CreatePostingDto) {
    return this.wauService.createPosting(createPostingDto);
  }
}

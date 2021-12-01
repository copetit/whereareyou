import { Body, Controller, Get, Param, Post, Version } from '@nestjs/common';
import { WauService } from './wau.service';
import { Posting } from './entities/posting.entity';
import { LocationInfo } from './entities/locationinfo.entity';
import { CreatePostingDto } from './dtos/create-posting.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('wau')
@Controller('')
export class WauController {
  constructor(private readonly wauService: WauService) {}

  @ApiOkResponse({ type: Posting })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Version('1')
  @Get('posting/:id')
  getPostingById(@Param('id') id: string): Promise<Posting[]> {
    return this.wauService.getPostingById(id);
  }

  @ApiOkResponse({ type: [LocationInfo] })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Version('1')
  @Get('locations')
  async getLocationinfo(): Promise<LocationInfo[]> {
    return this.wauService.getLocationInfo();
  }

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Version('1')
  @Post('posting')
  createPosting(@Body() createPostingDto: CreatePostingDto) {
    return this.wauService.createPosting(createPostingDto);
  }
}

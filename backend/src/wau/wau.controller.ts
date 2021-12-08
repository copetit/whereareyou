import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
  Version,
} from '@nestjs/common';

import { WauService } from './wau.service';
import { Posting } from './entities/posting.entity';
import { LocationInfo } from './entities/locationinfo.entity';
import { CreatePostingDto } from './dtos/create-posting.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

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

  // see.https://docs.nestjs.com/openapi/operations#file-upload
  @ApiConsumes('multipart/form-data')
  // [TODO] Create upload-files.dto.ts
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'file',
            format: 'binary',
          },
        },
      },
    },
  })
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files', 5, { dest: './contents' }))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
  // [TODO] Insert Conetents DB Filenames
  // [TODO] Create API Create Contents
  // Mock
  // [
  //   {
  //     fieldname: 'files',
  //     originalname: 'kittykitty.jpeg',
  //     encoding: '7bit',
  //     mimetype: 'image/jpeg',
  //     destination: './contents',
  //     filename: '2b5983ca6eabe22176cf07cd1c054681',
  //     path: 'contents/2b5983ca6eabe22176cf07cd1c054681',
  //     size: 3008271
  //   },
  //   {
  //     fieldname: 'files',
  //     originalname: 'S__83058692.png',
  //     encoding: '7bit',
  //     mimetype: 'image/png',
  //     destination: './contents',
  //     filename: 'e4dc6e358d2a460238383b2c9c23c17c',
  //     path: 'contents/e4dc6e358d2a460238383b2c9c23c17c',
  //     size: 490294
  //   }
  // ]
}

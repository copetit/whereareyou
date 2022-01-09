import {
  Body,
  Controller,
  Delete,
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
// import { CreateContentsDto } from './dtos/create-contents.dto';

@ApiTags('wau')
@Controller('')
export class WauController {
  constructor(private readonly wauService: WauService) {}

  // Posting情報取得API
  @ApiOkResponse({ type: Posting })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Version('1')
  @Get('posting/:id')
  getPostingById(@Param('id') id: number): Promise<Posting[]> {
    return this.wauService.getPostingById(id);
  }

  // 全Location情報取得API
  @ApiOkResponse({ type: [LocationInfo] })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Version('1')
  @Get('locations')
  getLocationinfo(): Promise<LocationInfo[]> {
    return this.wauService.getLocationInfo();
  }

  // // Contents情報作成API
  // @ApiCreatedResponse({
  //   description: 'The record has been successfully created.',
  // })
  // @ApiForbiddenResponse({ description: 'Forbidden.' })
  // @Version('1')
  // @Post('contents')
  // createContents(@Body() createContentsDto: CreateContentsDto) {
  //   return this.wauService.createContents(createContentsDto);
  // }

  // Posting情報作成API
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Version('1')
  @Post('posting')
  createPosting(@Body() createPostingDto: CreatePostingDto) {
    return this.wauService.createPosting(createPostingDto);
  }

  // Posting情報削除API
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Version('1')
  @Delete('posting/:id')
  async deletePosting(@Param('id') id: number) {
    return this.wauService.deletePosting(id);
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
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    let imageUrl: string[] = [];
    let videoUrl: string[] = [];
    files.map((file) => imageUrl.push(file.path));
    return { imageUrl, videoUrl };
  }
}

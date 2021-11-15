import { Controller, Get, Param } from '@nestjs/common';
import { WauService } from './wau.service';
import { Posting } from './entities/posting.entity';
import { LocationInfo } from './entities/locationinfo.entity';

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
}

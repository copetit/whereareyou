import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Posting } from './entities/posting.entity';
import { Contents } from './entities/contents.entity';
import { LocationInfo } from './entities/locationinfo.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('dummy')
  async getDummy(): Promise<string> {
    return this.appService.getDummy();
  }

  @Get('v1/wau/posting/:id')
  getPostingById(@Param('id') id: string): Promise<Posting[]> {
    return this.appService.getPostingById(id);
  }

  @Get('v1/wau/locations')
  async getLocationinfo(): Promise<LocationInfo[]> {
    return this.appService.getLocationInfo();
  }
}

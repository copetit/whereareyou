import { Module } from '@nestjs/common';
import { WauService } from './wau.service';
import { WauController } from './wau.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationInfo } from './entities/locationinfo.entity';
import { Contents } from './entities/contents.entity';
import { Posting } from './entities/posting.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationInfo, Contents, Posting, User])],
  controllers: [WauController],
  providers: [WauService],
})
export class WauModule {}

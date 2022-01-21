import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './wau/entities/user.entity';
import { Posting } from './wau/entities/posting.entity';
import { LocationInfo } from './wau/entities/locationinfo.entity';
import { Contents } from './wau/entities/contents.entity';
import { CommonModule } from './common/common.module';
import { WauModule } from './wau/wau.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'contents'),
      serveRoot: '/contents',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.0.25.2',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'wau',
      synchronize: true,
      entities: [User, Posting, LocationInfo, Contents],
    }),
    CommonModule,
    WauModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Posting } from './entities/posting.entity';
import { LocationInfo } from './entities/locationinfo.entity';
import { Contents } from './entities/contents.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '172.0.25.2',
      port: 27017,
      username: 'root',
      password: 'root',
      database: 'admin',
      entities: [User, Posting, LocationInfo, Contents],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

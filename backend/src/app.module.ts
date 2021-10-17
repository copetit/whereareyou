import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Location } from './entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '172.0.25.2',
      port: 27017,
      username: 'root',
      password: 'root',
      database: 'admin',
      entities: [Location],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

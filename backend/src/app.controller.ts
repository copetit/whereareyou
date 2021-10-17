import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { getMongoManager } from 'typeorm';
import { User } from './entities/user.entity';
import { Posting } from './entities/posting.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const user = new User();
    const posting = new Posting();

    user.Password = '1234';
    user.MailAddress = 'hoge@example.com';

    // posting
    posting.PostingNum = 1;
    posting.PetName = 'パンダ';
    posting.PetSex = '男';
    posting.PetAge = 7;
    posting.PetInfo = 'とてもかわいい';
    posting.Detail = 'とてもかわいい2';
    posting.LostDate = new Date('2021-12-09');
    posting.Address = 'hogehoge';

    const manager = getMongoManager();
    await manager.save(posting);
    await manager.save(user);
    return this.appService.getHello();
  }
}

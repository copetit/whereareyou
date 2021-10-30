import { Injectable } from '@nestjs/common';
import { getMongoManager } from 'typeorm';
import { Posting } from './entities/posting.entity';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const manager = getMongoManager();
    const user = new User();
    const posting = new Posting();
    // posting
    posting.PostingNum = 1;
    posting.PetName = 'パンダ';
    posting.PetSex = '男';
    posting.PetAge = 7;
    posting.PetInfo = 'とてもかわいい';
    posting.Detail = 'とてもかわいい2';
    posting.LostDate = new Date('2021-12-09');
    posting.Address = 'hogehoge';

    await manager.save(posting);
    // user
    user.Password = '1234';
    user.MailAddress = 'hoge@example.com';
    user.PostingNum = posting.PostingNum;

    await manager.save(user);
    return 'HELLO';
  }
}

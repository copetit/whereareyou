import { Injectable } from '@nestjs/common';
import { getMongoManager } from 'typeorm';
import { Posting } from './entities/posting.entity';
import { User } from './entities/user.entity';
import { LocationInfo } from './entities/locationinfo.entity';
import { Contents } from './entities/contents.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Main';
  }

  async getDummy(): Promise<string> {
    const manager = getMongoManager();
    // posting
    const posting = new Posting();

    posting.PetName = 'パンダ';
    posting.PetSex = '男';
    posting.PetAge = 7;
    posting.PetInfo = 'とてもかわいい';
    posting.Detail = 'とてもかわいい2';
    posting.LostDate = new Date('2021-12-09');
    posting.Address = 'hogehoge';

    await manager.save(posting);

    // user
    const user = new User();

    user.Password = '1234';
    user.MailAddress = 'hoge@example.com';
    user.posting = posting;
    await manager.save(user);

    // location
    const location = new LocationInfo();

    location.lat = 123;
    location.lng = 456;
    location.posting = posting;
    await manager.save(location);

    // contents
    const contents = new Contents();

    contents.imageUrl = 'dummyImage.com';
    contents.videoUrl = 'dummyVideo.com';
    contents.posting = posting;
    await manager.save(contents);

    return 'OK - Dummy Data';
  }
}

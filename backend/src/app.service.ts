import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { Contents } from './wau/entities/contents.entity';
import { LocationInfo } from './wau/entities/locationinfo.entity';
import { Posting } from './wau/entities/posting.entity';
import { User } from './wau/entities/user.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Main';
  }

  async getDummy(): Promise<string> {
    const manager = getManager();

    // user
    const user = new User();

    user.Password = '1234';
    user.MailAddress = 'hoge@example.com';
    await manager.save(user);

    // location (nerima station)
    const location = new LocationInfo();
    location.lat = 35.73805386139952;
    location.lng = 139.6538817110336;
    await manager.save(location);

    // location2 (nerima city hall)
    const locationTwo = new LocationInfo();
    locationTwo.lat = 35.73665547513479;
    locationTwo.lng = 139.6517759;
    await manager.save(locationTwo);

    // contents
    const contents = new Contents();

    contents.imageUrl = [
      'dummyImage.com',
      'dummyImage2.com',
      'dummyImage3.com',
      'dummyImage4.com',
      'dummyImage5.com',
    ];
    contents.videoUrl = [
      'dummyVideo.com',
      'dummyVideo2.com',
      'dummyVideo3.com',
      'dummyVideo4.com',
      'dummyVideo5.com',
    ];
    await manager.save(contents);

    // posting
    const posting = new Posting();

    posting.PetName = 'パンダ';
    posting.PetSex = '男';
    posting.PetAge = 7;
    posting.PetInfo = 'とてもかわいい';
    posting.Detail = 'とてもかわいい2';
    posting.LostDate = new Date('2021-12-09');
    posting.Address = 'address';
    posting.user = user;
    posting.locationinfo = location;
    posting.contents = contents;

    await manager.save(posting);

    return 'OK - Dummy Data';
  }
}

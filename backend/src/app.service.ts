import { Injectable } from '@nestjs/common';
import { getManager, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posting } from './entities/posting.entity';
import { User } from './entities/user.entity';
import { LocationInfo } from './entities/locationinfo.entity';
import { Contents } from './entities/contents.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(LocationInfo)
    private readonly locationInfoRepository: Repository<LocationInfo>,

    @InjectRepository(Posting)
    private readonly postingRepository: Repository<Posting>,
  ) {}

  getHello(): string {
    return 'Hello Main';
  }

  async getPostingById(id: string): Promise<Posting[]> {
    const posting = await this.postingRepository.find({
      where: {
        id,
      },
      relations: ['contents'],
    });
    return posting;
  }

  async getDummy(): Promise<string> {
    const manager = getManager();

    // user
    const user = new User();

    user.Password = '1234';
    user.MailAddress = 'hoge@example.com';
    await manager.save(user);

    // location
    const location = new LocationInfo();

    location.lat = 123;
    location.lng = 456;
    await manager.save(location);

    // contents
    const contents = new Contents();

    contents.imageUrl = 'dummyImage.com';
    contents.videoUrl = 'dummyVideo.com';
    await manager.save(contents);

    // posting
    const posting = new Posting();

    posting.PetName = 'パンダ';
    posting.PetSex = '男';
    posting.PetAge = 7;
    posting.PetInfo = 'とてもかわいい';
    posting.Detail = 'とてもかわいい2';
    posting.LostDate = new Date('2021-12-09');
    posting.Address = 'hogehoge';
    posting.user = user;
    posting.locationinfo = location;
    posting.contents = contents;

    await manager.save(posting);

    return 'OK - Dummy Data';
  }

  async getLocationInfo(): Promise<LocationInfo[]> {
    return this.locationInfoRepository.find();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateContentsDto,
  CreateContentsOutput,
} from './dtos/create-contents.dto';
import {
  CreatePostingDto,
  CreatePostingOutput,
} from './dtos/create-posting.dto';
import { CoreOutput } from './dtos/output.dto';
import { Contents } from './entities/contents.entity';
import { LocationInfo } from './entities/locationinfo.entity';
import { Posting } from './entities/posting.entity';
import { User } from './entities/user.entity';

@Injectable()
export class WauService {
  constructor(
    @InjectRepository(LocationInfo)
    private readonly locationInfoRepository: Repository<LocationInfo>,

    @InjectRepository(Posting)
    private readonly postingRepository: Repository<Posting>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Contents)
    private readonly contentsRepository: Repository<Contents>,
  ) {}

  async getPostingById(id: string): Promise<Posting[]> {
    const posting = await this.postingRepository.find({
      where: {
        id,
      },
      relations: ['locationinfo', 'user', 'contents'],
    });
    return posting;
  }

  async getLocationInfo(): Promise<LocationInfo[]> {
    return this.locationInfoRepository.find();
  }

  async createContents({
    imageUrl,
    videoUrl,
  }: CreateContentsDto): Promise<CreateContentsOutput> {
    try {
      const newContents = this.contentsRepository.create({
        imageUrl,
        videoUrl,
      });
      const { id } = await this.contentsRepository.save(newContents);
      return {
        id,
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async createPosting({
    PetName,
    PetSex,
    PetAge,
    PetInfo,
    Detail,
    LostDate,
    Address,
    CreatedDate,
    UpdateDate,
    locationinfo,
    user,
    contents,
  }: CreatePostingDto): Promise<CreatePostingOutput> {
    try {
      // LocationInfo
      const newLocation = this.locationInfoRepository.create(locationinfo);
      const { id: locationId } = await this.locationInfoRepository.save(
        newLocation,
      );
      locationinfo['id'] = locationId;

      // User
      const newUser = this.userRepository.create(user);
      const { id: userId } = await this.userRepository.save(newUser);
      user['id'] = userId;

      // Contents
      const newContents = this.contentsRepository.create(contents);
      const { id: contentsId } = await this.contentsRepository.save(
        newContents,
      );
      contents['id'] = contentsId;

      // Posting
      const newPosting = this.postingRepository.create({
        PetName,
        PetSex,
        PetAge,
        PetInfo,
        Detail,
        LostDate,
        Address,
        CreatedDate,
        UpdateDate,
        locationinfo,
        user,
        contents,
      });
      const { id } = await this.postingRepository.save(newPosting);

      return {
        id,
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deletePosting(id: string): Promise<CoreOutput> {
    try {
      const getPosting = await this.getPostingById(id);

      if (getPosting.length != 0) {
        await this.postingRepository.delete(id);
        await this.contentsRepository.delete(id);
        await this.locationInfoRepository.delete(id);
        await this.userRepository.delete(id);
      } else {
        throw 'The posting doesn’t exist';
      }
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}

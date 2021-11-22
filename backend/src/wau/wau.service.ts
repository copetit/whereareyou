import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePostingDto,
  CreatePostingOutput,
} from './dtos/create-posting.dto';
import { LocationInfo } from './entities/locationinfo.entity';
import { Posting } from './entities/posting.entity';

@Injectable()
export class WauService {
  constructor(
    @InjectRepository(LocationInfo)
    private readonly locationInfoRepository: Repository<LocationInfo>,

    @InjectRepository(Posting)
    private readonly postingRepository: Repository<Posting>,
  ) {}

  private readonly ErrorOutput = {
    ok: false,
    error: 'An Error Occurred.',
  };

  async getPostingById(id: string): Promise<Posting[]> {
    const posting = await this.postingRepository.find({
      where: {
        id,
      },
      relations: ['contents'],
    });
    return posting;
  }

  async getLocationInfo(): Promise<LocationInfo[]> {
    return this.locationInfoRepository.find();
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
      return this.ErrorOutput;
    }
  }
}

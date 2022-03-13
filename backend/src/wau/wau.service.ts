import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  CreatePostingDto,
  CreatePostingOutput,
} from './dtos/create-posting.dto';
import { CoreOutput } from './dtos/output.dto';
import {
  UpdatePostingDto,
  UpdatePostingOutput,
} from './dtos/update-posting.dto';
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

  async getPostingById(id: number): Promise<Posting[]> {
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
        Address: 'address',
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

  async updatePosting({
    id,
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
  }: UpdatePostingDto): Promise<UpdatePostingOutput> {
    try {
      const [getPosting] = await this.getPostingById(id);
      if (getPosting) {
        await this.contentsRepository.update({ id }, contents);
        await this.locationInfoRepository.update({ id }, locationinfo);
        await this.userRepository.update({ id }, user);
        await this.postingRepository.update(
          { id },
          {
            PetName,
            PetSex,
            PetAge,
            PetInfo,
            Detail,
            LostDate,
            Address: 'address',
            CreatedDate,
            UpdateDate,
          },
        );
        return {
          id,
          ok: true,
        };
      }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deletePosting(id: number): Promise<CoreOutput> {
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

  async getUser(id: number) {
    const user = await this.userRepository.find({
      id,
    });
    return user;
  }

  async isCorrectPassword(inputPW: string, id: number) {
    const [getUser] = await this.getUser(id);
    const userPW = getUser.Password;
    const result = bcrypt.compareSync(inputPW, userPW);
    return result ? true : false;
  }
}

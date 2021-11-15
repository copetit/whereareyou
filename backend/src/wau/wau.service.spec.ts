import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationInfo } from './entities/locationinfo.entity';
import { Posting } from './entities/posting.entity';
import { WauService } from './wau.service';

export type MockRepository<T> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  find: jest.fn(),
});

const TEST_POSTING: Posting = {
  id: 1,
  PetName: 'イーブイ',
  PetSex: '不明',
  PetAge: 1,
  PetInfo: 'かわいい',
  Detail: 'ふわふわなしっぽ',
  LostDate: new Date('2021-12-09'),
  Address: 'hogehoge',
  CreatedDate: new Date('2021-12-11'),
  UpdateDate: new Date('2021-12-11'),
  locationinfo: { id: 1, lat: 12, lng: 56 },
  user: { id: 1, Password: '12345678', MailAddress: 'dummy@test.com' },
  contents: {
    id: 1,
    imageUrl: ['dummyImage@dummy.com', 'dummyImage2@dummy.com'],
    videoUrl: ['dummyVideo@dummy.com', 'dummyVideo2@dummy.com'],
  },
};

const TEST_LOCATIONINFO: LocationInfo = { id: 1, lat: 12, lng: 56 };
const TEST_LOCATIONINFO_TWO: LocationInfo = { id: 2, lat: 55, lng: 88 };

describe('WauService', () => {
  let service: WauService;

  let postingRepository: MockRepository<Posting>;
  let locationinfoRepository: MockRepository<LocationInfo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WauService,
        { provide: getRepositoryToken(Posting), useValue: mockRepository() },
        {
          provide: getRepositoryToken(LocationInfo),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<WauService>(WauService);
    postingRepository = module.get(getRepositoryToken(Posting));
    locationinfoRepository = module.get(getRepositoryToken(LocationInfo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(postingRepository).toBeDefined();
    expect(locationinfoRepository).toBeDefined();
  });

  describe('getPostingById', () => {
    it('shoud success to return posting', async () => {
      postingRepository.find.mockResolvedValueOnce([TEST_POSTING]);

      const result = await service.getPostingById('1');

      expect(postingRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toMatchObject([TEST_POSTING]);
    });

    it('shoud fail to return posting', async () => {
      postingRepository.find.mockResolvedValueOnce([]);

      const result = await service.getPostingById('1');
      expect(postingRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toMatchObject([]);
    });
  });

  describe('getLocationInfo', () => {
    it('shoud success to return locationinfo', async () => {
      locationinfoRepository.find.mockResolvedValueOnce([
        TEST_LOCATIONINFO,
        TEST_LOCATIONINFO_TWO,
      ]);

      const result = await service.getLocationInfo();

      expect(locationinfoRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toMatchObject([TEST_LOCATIONINFO, TEST_LOCATIONINFO_TWO]);
    });

    it('shoud fail to return locationinfo', async () => {
      locationinfoRepository.find.mockResolvedValueOnce([]);

      const result = await service.getLocationInfo();
      expect(locationinfoRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toMatchObject([]);
    });
  });
});

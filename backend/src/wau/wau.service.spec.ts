import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationInfo } from './entities/locationinfo.entity';
import { Posting } from './entities/posting.entity';
import { WauService } from './wau.service';
import { CreatePostingDto } from './dtos/create-posting.dto';
import { User } from './entities/user.entity';
import { Contents } from './entities/contents.entity';

// Mock Repositoryの型
// Repositoryのmethod key全部を jest.mockによってmockingする
// それを型化
export type MockRepository<T> = Partial<Record<keyof Repository<T>, jest.Mock>>;

// jestのmock function作成
const mockRepository = () => ({
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

// Posting Table Dummy Data
const TEST_POSTING: Posting = {
  id: 1,
  PetName: 'イーブイ',
  PetSex: '不明',
  PetAge: 1,
  PetInfo: 'かわいい',
  Detail: 'ふわふわなしっぽ',
  LostDate: new Date('20211209'),
  Address: 'hogehoge',
  CreatedDate: new Date('20211211'),
  UpdateDate: new Date('20211211'),
  locationinfo: { id: 1, lat: 12, lng: 56 },
  user: { id: 1, Password: '12345678', MailAddress: 'dummy@test.com' },
  contents: {
    id: 1,
    imageUrl: ['dummyImage@dummy.com', 'dummyImage2@dummy.com'],
    videoUrl: ['dummyVideo@dummy.com', 'dummyVideo2@dummy.com'],
  },
};

// Create Posting Dummy
const TEST_POSTING_POST: CreatePostingDto = {
  PetName: 'イーブイ',
  PetSex: '不明',
  PetAge: 1,
  PetInfo: 'かわいい',
  Detail: 'ふわふわなしっぽ',
  LostDate: new Date('20211209'),
  Address: 'hogehoge',
  CreatedDate: new Date('20211211'),
  UpdateDate: new Date('20211211'),
  locationinfo: { lat: 12, lng: 56 },
  user: { Password: '12345678', MailAddress: 'dummy@test.com' },
  contents: {
    imageUrl: ['dummyImage@dummy.com', 'dummyImage2@dummy.com'],
    videoUrl: ['dummyVideo@dummy.com', 'dummyVideo2@dummy.com'],
  },
};

// LocationInfo Table Dummy Data
const TEST_LOCATIONINFO: LocationInfo = { id: 1, lat: 12, lng: 56 };
const TEST_LOCATIONINFO_TWO: LocationInfo = { id: 2, lat: 55, lng: 88 };

// WausServiceに対するテスト
describe('WauService', () => {
  let service: WauService;

  // Posting(Entity)のMockRepository
  let postingRepository: MockRepository<Posting>;
  // Location(Entity)のMockRepository
  let locationinfoRepository: MockRepository<LocationInfo>;
  // User(Entity)のMockRepository
  let userRepository: MockRepository<User>;
  // Contents(Entity)のMockRepository
  let contentsRepository: MockRepository<Contents>;

  beforeEach(async () => {
    // Module定義
    // getRepositoryToken
    // See.https://qiita.com/potato4d/items/64a1f518abdfe281ce01#provider-の抽象化とトークン作成
    // See.https://stackoverflow.com/questions/65570680/what-is-getrepositorytoken-in-nestjs-typeorm-and-when-to-use-it
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WauService,
        { provide: getRepositoryToken(Posting), useValue: mockRepository() },
        {
          provide: getRepositoryToken(LocationInfo),
          useValue: mockRepository(),
        },
        { provide: getRepositoryToken(User), useValue: mockRepository() },
        {
          provide: getRepositoryToken(Contents),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<WauService>(WauService);
    postingRepository = module.get(getRepositoryToken(Posting));
    locationinfoRepository = module.get(getRepositoryToken(LocationInfo));
    userRepository = module.get(getRepositoryToken(User));
    contentsRepository = module.get(getRepositoryToken(Contents));
  });

  // Mock postingRepository/locationinfoRepositoryに問題ないか確認
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(postingRepository).toBeDefined();
    expect(locationinfoRepository).toBeDefined();
  });

  // getPostingByIdのテスト
  describe('getPostingById', () => {
    // success
    it('should success to return posting', async () => {
      // MockにTEST_POSTING　DummyData Insert
      // See.https://jestjs.io/ja/docs/mock-function-api#mockfnmockresolvedvalueoncevalue
      postingRepository.find.mockResolvedValueOnce([TEST_POSTING]);

      const result = await service.getPostingById('1');

      expect(postingRepository.find).toHaveBeenCalledTimes(1);
      // getPostingById('1') === TEST_POSTING 確認
      expect(result).toMatchObject([TEST_POSTING]);
    });

    // fail
    it('should fail to return posting', async () => {
      // Mockが空の場合
      postingRepository.find.mockResolvedValueOnce([]);

      const result = await service.getPostingById('1');
      expect(postingRepository.find).toHaveBeenCalledTimes(1);
      // service.getPostingById('1') === []
      expect(result).toMatchObject([]);
    });
  });

  // getLocationInfoのテスト
  describe('getLocationInfo', () => {
    // success
    it('should success to return locationinfo', async () => {
      // MockにTEST_LOCATIONINFO / TEST_LOCATIONINFO_TWO　DummyData Insert
      locationinfoRepository.find.mockResolvedValueOnce([
        TEST_LOCATIONINFO,
        TEST_LOCATIONINFO_TWO,
      ]);

      const result = await service.getLocationInfo();

      expect(locationinfoRepository.find).toHaveBeenCalledTimes(1);
      // getLocationInfo() === [TEST_LOCATIONINFO, TEST_LOCATIONINFO_TWO]
      expect(result).toMatchObject([TEST_LOCATIONINFO, TEST_LOCATIONINFO_TWO]);
    });

    it('should fail to return locationinfo', async () => {
      // Mockが空の場合
      locationinfoRepository.find.mockResolvedValueOnce([]);

      const result = await service.getLocationInfo();
      expect(locationinfoRepository.find).toHaveBeenCalledTimes(1);
      // getLocationInfo() === []
      expect(result).toMatchObject([]);
    });
  });

  // createPostingのテスト
  describe('createPosting', () => {
    // success
    it('should success to return createPosting', async () => {
      const createParamLocationInfo = TEST_POSTING_POST.locationinfo;
      const createParamUser = TEST_POSTING_POST.user;
      const createParamContents = TEST_POSTING_POST.contents;
      const createParamPosting = {
        PetName: TEST_POSTING_POST.PetName,
        PetSex: TEST_POSTING_POST.PetSex,
        PetAge: TEST_POSTING_POST.PetAge,
        PetInfo: TEST_POSTING_POST.PetInfo,
        Detail: TEST_POSTING_POST.Detail,
        LostDate: TEST_POSTING_POST.LostDate,
        Address: TEST_POSTING_POST.Address,
        CreatedDate: TEST_POSTING_POST.CreatedDate,
        UpdateDate: TEST_POSTING_POST.UpdateDate,
        locationinfo: TEST_POSTING_POST.locationinfo,
        user: TEST_POSTING_POST.user,
        contents: TEST_POSTING_POST.contents,
      };

      locationinfoRepository.create.mockReturnValueOnce(
        createParamLocationInfo,
      );
      locationinfoRepository.save.mockResolvedValueOnce(
        TEST_POSTING.locationinfo,
      );
      userRepository.create.mockReturnValueOnce(createParamUser);
      userRepository.save.mockResolvedValueOnce(TEST_POSTING.user);
      contentsRepository.create.mockReturnValueOnce(createParamContents);
      contentsRepository.save.mockResolvedValueOnce(TEST_POSTING.contents);
      postingRepository.create.mockReturnValueOnce(createParamPosting);
      postingRepository.save.mockResolvedValueOnce(TEST_POSTING);

      const result = await service.createPosting(createParamPosting);

      expect(postingRepository.create).toHaveBeenCalledTimes(1);
      expect(postingRepository.create).toHaveBeenCalledWith(TEST_POSTING_POST);
      expect(postingRepository.save).toHaveBeenCalledTimes(1);
      expect(postingRepository.save).toHaveBeenCalledWith(TEST_POSTING_POST);
      expect(result).toMatchObject({ ok: true, id: TEST_POSTING.id });
    });
  });
});

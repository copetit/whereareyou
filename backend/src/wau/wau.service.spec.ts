import { Test, TestingModule } from '@nestjs/testing';
import { WauService } from './wau.service';

describe('WauService', () => {
  let service: WauService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WauService],
    }).compile();

    service = module.get<WauService>(WauService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

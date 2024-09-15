import { Test, TestingModule } from '@nestjs/testing';
import { TestingmyshitService } from './testingmyshit.service';

describe('TestingmyshitService', () => {
  let service: TestingmyshitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestingmyshitService],
    }).compile();

    service = module.get<TestingmyshitService>(TestingmyshitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

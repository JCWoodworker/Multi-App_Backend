import { Test, TestingModule } from '@nestjs/testing';
import { NewfuckingsubappService } from './newfuckingsubapp.service';

describe('NewfuckingsubappService', () => {
  let service: NewfuckingsubappService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewfuckingsubappService],
    }).compile();

    service = module.get<NewfuckingsubappService>(NewfuckingsubappService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

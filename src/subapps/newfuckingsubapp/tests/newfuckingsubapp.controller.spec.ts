import { Test, TestingModule } from '@nestjs/testing';
import { NewfuckingsubappController } from './newfuckingsubapp.controller';
import { NewfuckingsubappService } from './newfuckingsubapp.service';

describe('NewfuckingsubappController', () => {
  let controller: NewfuckingsubappController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewfuckingsubappController],
      providers: [NewfuckingsubappService],
    }).compile();

    controller = module.get<NewfuckingsubappController>(NewfuckingsubappController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

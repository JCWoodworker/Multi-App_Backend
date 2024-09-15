import { Test, TestingModule } from '@nestjs/testing';
import { TestingmyshitController } from './testingmyshit.controller';
import { TestingmyshitService } from './testingmyshit.service';

describe('TestingmyshitController', () => {
  let controller: TestingmyshitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestingmyshitController],
      providers: [TestingmyshitService],
    }).compile();

    controller = module.get<TestingmyshitController>(TestingmyshitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

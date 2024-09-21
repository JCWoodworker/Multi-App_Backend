import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService; 

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService], // Make sure AppService is provided
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService); // Get the AppService instance
  });

  describe('root', () => {
    it('should return the value from appService.getHello', () => {
      const expectedResult = 'Some value from AppService'; // Replace with the actual expected value
      jest.spyOn(appService, 'getHello').mockReturnValue(expectedResult); // Mock the AppService method

      expect(appController.getHello()).toBe(expectedResult);
    });
  });
});
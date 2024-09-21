import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call usersService.create', () => {
      const createUserDto: CreateUserDto = {
        /* provide sample data */
      };
      const createSpy = jest.spyOn(service, 'create');
      controller.create(createUserDto);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should call usersService.findAll', () => {
      const findAllSpy = jest.spyOn(service, 'findAll');
      controller.findAll();
      expect(findAllSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call usersService.findOne', () => {
      const id = '1';
      const findOneSpy = jest.spyOn(service, 'findOne');
      controller.findOne(id);
      expect(findOneSpy).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should call usersService.update', () => {
      const id = '1';
      const updateUserDto: UpdateUserDto = {
        /* provide sample data */
      };
      const updateSpy = jest.spyOn(service, 'update');
      controller.update(id, updateUserDto);
      expect(updateSpy).toHaveBeenCalledWith(+id, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should call usersService.remove', () => {
      const id = '1';
      const removeSpy = jest.spyOn(service, 'remove');
      controller.remove(id);
      expect(removeSpy).toHaveBeenCalledWith(+id);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the correct message', () => {
      const createUserDto: CreateUserDto = {
        /* provide sample data */
      };
      expect(service.create(createUserDto)).toBe('This action adds a new user');
    });
  });

  describe('findAll', () => {
    it('should return the correct message', () => {
      expect(service.findAll()).toBe('This action returns all users');
    });
  });

  describe('findOne', () => {
    it('should return the correct message', () => {
      const id = 1;
      expect(service.findOne(id)).toBe(`This action returns a #${id} user`);
    });
  });

  describe('update', () => {
    it('should return the correct message', () => {
      const id = 1;
      const updateUserDto: UpdateUserDto = {
        /* provide sample data */
      };
      expect(service.update(id, updateUserDto)).toBe(
        `This action updates a #${id} user`,
      );
    });
  });

  describe('remove', () => {
    it('should return the correct message', () => {
      const id = 1;
      expect(service.remove(id)).toBe(`This action removes a #${id} user`);
    });
  });
});

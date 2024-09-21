import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../src/users/dto/update-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/users (POST)', () => {
    it('should create a new user', () => {
      const createUserDto: CreateUserDto = {
        /* provide sample data */
      };
      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201)
        .expect('This action adds a new user');
    });
  });

  describe('/users (GET)', () => {
    it('should get all users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect('This action returns all users');
    });
  });

  describe('/users/:id (GET)', () => {
    it('should get a user by id', () => {
      const id = 1;
      return request(app.getHttpServer())
        .get(`/users/${id}`)
        .expect(200)
        .expect(`This action returns a #${id} user`);
    });
  });

  describe('/users/:id (PATCH)', () => {
    it('should update a user', () => {
      const id = 1;
      const updateUserDto: UpdateUserDto = {
        /* provide sample data */
      };
      return request(app.getHttpServer())
        .patch(`/users/${id}`)
        .send(updateUserDto)
        .expect(200)
        .expect(`This action updates a #${id} user`);
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete a user', () => {
      const id = 1;
      return request(app.getHttpServer())
        .delete(`/users/${id}`)
        .expect(200)
        .expect(`This action removes a #${id} user`);
    });
  });
});

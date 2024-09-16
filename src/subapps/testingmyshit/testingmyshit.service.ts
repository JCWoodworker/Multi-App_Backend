import { Injectable } from '@nestjs/common';
import { CreateTestingmyshitDto } from './dto/create-testingmyshit.dto';
import { UpdateTestingmyshitDto } from './dto/update-testingmyshit.dto';

@Injectable()
export class TestingmyshitService {
  create(createTestingmyshitDto: CreateTestingmyshitDto) {
    return 'This action adds a new testingmyshit';
  }

  findAll() {
    return `This action returns all testingmyshit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testingmyshit`;
  }

  update(id: number, updateTestingmyshitDto: UpdateTestingmyshitDto) {
    return `This action updates a #${id} testingmyshit`;
  }

  remove(id: number) {
    return `This action removes a #${id} testingmyshit`;
  }
}

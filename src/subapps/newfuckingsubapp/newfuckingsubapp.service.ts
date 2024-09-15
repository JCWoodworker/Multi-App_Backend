import { Injectable } from '@nestjs/common';
import { CreateNewfuckingsubappDto } from './dto/create-newfuckingsubapp.dto';
import { UpdateNewfuckingsubappDto } from './dto/update-newfuckingsubapp.dto';

@Injectable()
export class NewfuckingsubappService {
  create(createNewfuckingsubappDto: CreateNewfuckingsubappDto) {
    return 'This action adds a new newfuckingsubapp';
  }

  findAll() {
    return `This action returns all newfuckingsubapp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} newfuckingsubapp`;
  }

  update(id: number, updateNewfuckingsubappDto: UpdateNewfuckingsubappDto) {
    return `This action updates a #${id} newfuckingsubapp`;
  }

  remove(id: number) {
    return `This action removes a #${id} newfuckingsubapp`;
  }
}

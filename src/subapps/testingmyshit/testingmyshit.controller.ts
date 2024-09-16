import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestingmyshitService } from './testingmyshit.service';
import { CreateTestingmyshitDto } from './dto/create-testingmyshit.dto';
import { UpdateTestingmyshitDto } from './dto/update-testingmyshit.dto';

@Controller('testingmyshit')
export class TestingmyshitController {
  constructor(private readonly testingmyshitService: TestingmyshitService) {}

  @Post()
  create(@Body() createTestingmyshitDto: CreateTestingmyshitDto) {
    return this.testingmyshitService.create(createTestingmyshitDto);
  }

  @Get()
  findAll() {
    return this.testingmyshitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testingmyshitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestingmyshitDto: UpdateTestingmyshitDto) {
    return this.testingmyshitService.update(+id, updateTestingmyshitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testingmyshitService.remove(+id);
  }
}

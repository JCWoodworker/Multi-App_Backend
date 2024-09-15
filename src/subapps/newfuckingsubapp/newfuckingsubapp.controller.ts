import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewfuckingsubappService } from './newfuckingsubapp.service';
import { CreateNewfuckingsubappDto } from './dto/create-newfuckingsubapp.dto';
import { UpdateNewfuckingsubappDto } from './dto/update-newfuckingsubapp.dto';

@Controller('newfuckingsubapp')
export class NewfuckingsubappController {
  constructor(private readonly newfuckingsubappService: NewfuckingsubappService) {}

  @Post()
  create(@Body() createNewfuckingsubappDto: CreateNewfuckingsubappDto) {
    return this.newfuckingsubappService.create(createNewfuckingsubappDto);
  }

  @Get()
  findAll() {
    return this.newfuckingsubappService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newfuckingsubappService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewfuckingsubappDto: UpdateNewfuckingsubappDto) {
    return this.newfuckingsubappService.update(+id, updateNewfuckingsubappDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newfuckingsubappService.remove(+id);
  }
}

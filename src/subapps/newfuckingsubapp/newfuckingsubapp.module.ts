import { Module } from '@nestjs/common';
import { NewfuckingsubappService } from './newfuckingsubapp.service';
import { NewfuckingsubappController } from './newfuckingsubapp.controller';

@Module({
  controllers: [NewfuckingsubappController],
  providers: [NewfuckingsubappService],
})
export class NewfuckingsubappModule {}

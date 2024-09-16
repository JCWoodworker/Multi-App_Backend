import { Module } from '@nestjs/common';
import { TestingmyshitService } from './testingmyshit.service';
import { TestingmyshitController } from './testingmyshit.controller';

@Module({
  controllers: [TestingmyshitController],
  providers: [TestingmyshitService],
})
export class TestingmyshitModule {}

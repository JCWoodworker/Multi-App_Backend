import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewfuckingsubappModule } from './subapps/newfuckingsubapp/newfuckingsubapp.module';
import { TestingmyshitModule } from './subapps/testingmyshit/testingmyshit.module';

@Module({
  imports: [NewfuckingsubappModule, TestingmyshitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

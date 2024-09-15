import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewfuckingsubappModule } from './subapps/newfuckingsubapp/newfuckingsubapp.module';

@Module({
  imports: [NewfuckingsubappModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrugsController } from './drugs.controller';

@Module({
  imports: [],
  controllers: [AppController, DrugsController],
  providers: [AppService],
})
export class AppModule {}

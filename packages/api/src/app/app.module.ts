import { Module } from '@nestjs/common';
import { NestConfigModule } from '../config/config.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [NestConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

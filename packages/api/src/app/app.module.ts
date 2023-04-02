import { Module } from '@nestjs/common';
import { NestConfigModule } from '../config/config.module';
import { EnrichMikroOrmModule } from '../config/mikro-orm/mikro-orm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiControllerModule } from './controller';

@Module({
  imports: [
    NestConfigModule,
    EnrichMikroOrmModule.forRoot(),
    ApiControllerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

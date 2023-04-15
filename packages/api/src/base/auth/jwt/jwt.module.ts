import { Module } from '@nestjs/common';
import { NestConfigModule } from '../../../config/config.module';
import { JwtService } from './jwt.service';

@Module({
  imports: [NestConfigModule],
  controllers: [],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}

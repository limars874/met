import { Module } from '@nestjs/common';
import { UserControllerModule } from './user.controller';

@Module({
  imports: [UserControllerModule],
})
export class ApiControllerModule {}

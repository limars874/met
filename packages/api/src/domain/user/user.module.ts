import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserEntity } from '../../entity/user/user.entity';
import { DefaultUserServiceProvider } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [DefaultUserServiceProvider],
  exports: [DefaultUserServiceProvider],
})
export class UsersModule {}

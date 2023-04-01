import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { EnrichMikroOrmModule } from '../../config/mikro-orm/mikro-orm.module';
import { UserEntity } from '../../entity/user/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        EnrichMikroOrmModule.forTest(),
        MikroOrmModule.forFeature([UserEntity]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should be create user', async () => {
    const payload = {
      username: 'username',
      email: 'email',
      avatar: 'avatar',
      password: 'password',
    };
    const user = await service.create(payload);
    expect(user.id).toBeDefined();
    await service.delete(user.id);
  });
});

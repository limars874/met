import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { EnrichMikroOrmModule } from '../../config/mikro-orm/mikro-orm.module';
import { UserEntity } from '../../entity/user/user.entity';
import { DefaultUserService } from './user.service';

describe('UserService', () => {
  let service: DefaultUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        EnrichMikroOrmModule.forTest(),
        MikroOrmModule.forFeature([UserEntity]),
      ],
      providers: [DefaultUserService],
    }).compile();

    service = module.get(DefaultUserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should be create user and get and update', async () => {
    // test create
    const payload = {
      username: 'username',
      email: 'email',
      avatar: 'avatar',
      password: 'password',
    };
    const user = await service.create(payload);
    expect(user.id).toBeDefined();

    // test get
    const findUser = await service.findOne(user.id);
    expect(findUser.username).toEqual(payload.username);
    expect(findUser.email).toEqual(payload.email);

    // test update
    const updatePayload = {
      id: user.id,
      username: 'username2',
      email: 'email2',
    };
    await service.update(updatePayload);
    {
      const findUser = await service.findOne(user.id);
      expect(findUser.username).toEqual(updatePayload.username);
      expect(findUser.email).toEqual(updatePayload.email);
    }

    // clean data
    await service.remove(user.id);
  });

  it('should be get null when user not exist', async () => {
    const user = await service.findOne('0');
    expect(user).toBeNull();
  });
});

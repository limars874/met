import { InjectRepository } from '@mikro-orm/nestjs';
import { UserEntity } from '../../entity/user/user.entity';
import { UserRepository } from '../../entity/user/user.repository';
import { UserNotFoundError, UserService } from './user.interface';

export class DefaultUserService extends UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: UserRepository,
  ) {
    super();
  }

  async create(data: {
    username: string;
    email: string;
    avatar: string;
    password: string;
  }): Promise<UserEntity> {
    const user = await this.repo.create(new UserEntity(data));
    await this.repo.persistAndFlush(user);
    return user;
  }

  async update(data: {
    id: string;
    username?: string;
    email?: string;
    avatar?: string;
    password?: string;
  }): Promise<void> {
    await this.repo.update(data as UserEntity);
  }

  async findOne(id: string): Promise<UserEntity | null> {
    return await this.repo.findOne({ id });
  }
  async findOneOrThrow(id: string): Promise<UserEntity> {
    const user = await this.repo.findOne({ id });
    if (!user) {
      throw new UserNotFoundError(id);
    }
    return user;
  }

  async exists(id: string): Promise<boolean> {
    return !!(await this.repo.findOne({ id }));
  }

  async remove(id: string): Promise<void> {
    const ref = this.repo.getReference(id);
    await this.repo.removeAndFlush(ref);
  }
}

export const DefaultUserServiceProvider = {
  provide: UserService,
  useClass: DefaultUserService,
};

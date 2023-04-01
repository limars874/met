import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entity/user/user.entity';
import { UserRepository } from '../../entity/user/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: UserRepository,
  ) {}

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

  async exists(id: string): Promise<boolean> {
    return !!(await this.repo.findOne({ id }));
  }

  async delete(id: string): Promise<void> {
    const user = this.repo.getReference(id);
    await this.repo.removeAndFlush(user);
  }
}

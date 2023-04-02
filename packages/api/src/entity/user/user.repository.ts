import { EntityRepository } from '@mikro-orm/postgresql';
import { UserEntity } from './user.entity';

export class UserRepository extends EntityRepository<UserEntity> {
  async update(data: UserEntity): Promise<void> {
    const { id, ...payload } = data;
    Object.keys(payload).forEach(key => {
      if (payload[key] === undefined) {
        delete payload[key];
      }
    });
    if (Object.keys(payload).length === 0) {
      return;
    }
    const ref = this.getReference(id);
    this.assign(ref, payload);
    await this.persistAndFlush(ref);
  }
}

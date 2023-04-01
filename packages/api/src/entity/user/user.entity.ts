import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../base-entity';
import { UserRepository } from './user.repository';

@Entity({
  tableName: 'user',
  customRepository: () => UserRepository,
})
export class UserEntity extends BaseEntity {
  @Property({ length: 255 })
  firstName = '';

  @Property({ length: 255 })
  lastName = '';

  @Unique()
  @Property({ length: 255 })
  username!: string;

  @Unique()
  @Property({ length: 255 })
  email!: string;

  @Property({ length: 255 })
  avatar!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ length: 255 })
  refreshToken = '';

  @Property({ length: 255 })
  rememberMe = false;

  constructor(initData: {
    username: string;
    email: string;
    avatar: string;
    password: string;
  }) {
    super();
    this.username = initData.username;
    this.email = initData.email;
    this.avatar = initData.avatar;
    this.password = initData.password;
  }
}

import { NamedError } from '../../base/error/typed-errors';
import { UserEntity } from '../../entity/user/user.entity';

export class UserNotFoundError extends NamedError {
  constructor(id: string) {
    super(`User with id ${id} not found`);
  }
}

export abstract class UserService {
  abstract create(data: {
    username: string;
    email: string;
    avatar: string;
    password: string;
  }): Promise<UserEntity>;
  abstract update(data: {
    id: string;
    username?: string;
    email?: string;
    avatar?: string;
    password?: string;
  }): Promise<void>;
  abstract findOne(id: string): Promise<UserEntity | null>;
  abstract findOneOrThrow(id: string): Promise<UserEntity>;
  abstract exists(id: string): Promise<boolean>;
  abstract remove(id: string): Promise<void>;
}

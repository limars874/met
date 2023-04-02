import { PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

/* A base class for all entities. */
export abstract class BaseEntity {
  @PrimaryKey({ type: 'uuid' })
  id = v4();

  @Property({ hidden: true })
  isObsolete = false; // deleted status, hidden true removed the property during deserialization

  @Property()
  deletedAt?: Date;

  @Property()
  createdAt = new Date();

  @Property({
    onUpdate: () => new Date(),
    hidden: true,
  })
  updatedAt? = new Date();
}

import { PrimaryKey, Property } from '@mikro-orm/core';
import { randomUUID } from 'crypto';

/* A base class for all entities. */
export abstract class BaseEntity {
  @PrimaryKey({ hidden: true, type: 'bigint' })
  id!: string;

  @Property()
  idx: string = randomUUID();

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

import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger } from '@nestjs/common';
import dotenv from 'dotenv';
import dotEnvExpand from 'dotenv-expand';
import path from 'path';
import { UserEntity } from '../../repository/user/user.entity';

/**
 * This is required to run mikro-orm cli
 *
 */

const logger = new Logger('MikroORM-CLI');
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const baseDir = path.resolve(__dirname, '../../../../../');

const myEnvironment = dotenv.config({
  path: `${baseDir}/env/.env.${env}`,
});

dotEnvExpand.expand(myEnvironment);

logger.log(`Using env ${process.cwd()}/env/.env.${env}\n`);

const config = {
  dbName: process.env.DB_DATABASE,
  debug: env === 'dev',
  entities: [UserEntity],
  entitiesTs: [UserEntity],
  // discovery: { disableDynamicFileAccess: true },
  // entitiesTs: [`${baseDir}/met/packages/api/src/**/*.entity.ts`],
  host: process.env.DB_HOST,
  schemaGenerator: {
    createForeignKeyConstraints: false, // whether to generate FK constraints
  },
  migrations: {
    path: `${baseDir}/dist/db/migrations/`,
    pathTs: `${baseDir}/packages/db/migrations/`,
    tableName: 'migrations',
    transactional: true,
    disableForeignKeys: true,
    safe: true,
  },
  seeder: {
    path: `${baseDir}/dist/db/seeders/`, // path to the folder with seeders
    pathTs: `${baseDir}/packages/db/seeders/`, // path to the folder with seeders
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
  },
  password: process.env.DB_PASSWORD,
  port: +(process.env.DB_PORT ?? 5432),
  type: 'postgresql',
  logger: logger.log.bind(logger),
  highlighter: new SqlHighlighter(),
  user: process.env.DB_USERNAME,
  metadataProvider: TsMorphMetadataProvider,
} as Options;

export default config;

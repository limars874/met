// import { Options } from '@mikro-orm/core';
// import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
// import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
// import { Logger } from '@nestjs/common';
// import dotenv from 'dotenv';
// import dotEnvExpand from 'dotenv-expand';

/**
 * This is required to run mikro-orm cli
 *
 */

// const logger = new Logger('MikroORM-CLI');

// const myEnvironment = dotenv.config({
//   path: `${process.cwd()}/env/.env.${process.env.NODE_ENV}`,
// });

// dotEnvExpand.expand(myEnvironment);

// logger.log(`�️  Using env ${process.cwd()}/env/.env.${process.env.NODE_ENV}\n`);

// const config = {
//   dbName: process.env.DB_DATABASE,
//   debug: true,
//   entities: ['dist/**/*.entity.js'],
//   entitiesTs: ['packages/**/*.entity.ts'],
//   host: process.env.DB_HOST,
//   schemaGenerator: {
//     createForeignKeyConstraints: false, // whether to generate FK constraints
//   },
//   migrations: {
//     path: 'dist/migrations/',
//     pathTs: 'packages/migrations/',
//     tableName: 'migrations',
//     transactional: true,
//     disableForeignKeys: true,
//     safe: true,
//   },
//   seeder: {
//     path: 'dist/commons/database/seeders/', // path to the folder with seeders
//     pathTs: 'packages/commons/database/seeders/', // path to the folder with seeders
//     defaultSeeder: 'DatabaseSeeder', // default seeder class name
//     glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
//     emit: 'ts', // seeder generation mode
//   },
//   password: process.env.DB_PASSWORD,
//   port: +(process.env.DB_PORT ?? 3306),
//   type: 'mysql',
//   logger: logger.log.bind(logger),
//   highlighter: new SqlHighlighter(),
//   user: process.env.DB_USERNAME,
//   metadataProvider: TsMorphMetadataProvider,
// } as Options;

// export default config;

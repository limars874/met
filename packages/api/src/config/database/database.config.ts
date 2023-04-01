import { registerAs } from '@nestjs/config';

export const database = registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT ?? 3306),
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  dbName: process.env.DB_DATABASE,
}));

import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database } from './database/database.config';
import { jwt } from './jwt/jwt.config';
import { validationSchema } from './validate.config';

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`env/.env.${env}`, `env/.env`],
      load: [database, jwt],
      cache: true,
      isGlobal: true,
      expandVariables: true,
      validationSchema: validationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class NestConfigModule {}

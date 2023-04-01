import {
  ConsoleLogger,
  INestApplication,
  LoggerService,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AllExceptionsFilter } from '../filter/all-exceptions.filter';
import { EnhancedExpressAdapter } from './enhanced-express-adapter';

const clientJsonPayloadLimit = process.env.JSON_PAYLOAD_LIMIT ?? '50mb';

export async function bootstrap(
  module: any,
  postSetup?: (
    app: INestApplication,
    logger: LoggerService,
  ) => Promise<void> | void,
) {
  const app = await NestFactory.create(module, new EnhancedExpressAdapter());
  const config = app.get(ConfigService);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix, { exclude: [''] });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableCors();
  app.use(json({ limit: clientJsonPayloadLimit }));
  app.use(urlencoded({ limit: clientJsonPayloadLimit, extended: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  let logger: LoggerService;
  if (logger == null) {
    logger = new ConsoleLogger();
  }
  if (postSetup != null) {
    await postSetup(app, logger);
  }

  process
    .on('unhandledRejection', reason => {
      const message =
        reason instanceof Error
          ? `${reason.stack ?? reason}`
          : JSON.stringify(reason);
      logger.error(`unhandledRejection: ${message}`);
      process.exit(1);
    })
    .on('uncaughtException', (err, origin) => {
      logger.error(`${origin} ${err.name} ${err.stack}`);
      process.exit(1);
    });

  app.enableShutdownHooks();

  const port = config.get<number>('PORT') || 3000;
  await app.listen(port);
  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

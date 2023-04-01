import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { INestApplication, LoggerService } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export interface SwaggerInfo {
  title: string;
  description: string;
  version: string;
}

export function enableSwagger(info: SwaggerInfo) {
  return (app: INestApplication, logger: LoggerService) => {
    const swaggerBuilder = new DocumentBuilder()
      .addBearerAuth()
      .setTitle(info.title)
      .setDescription(info.description)
      .setVersion(info.version)
      .build();
    patchNestjsSwagger();
    const document = SwaggerModule.createDocument(app, swaggerBuilder);
    SwaggerModule.setup('swagger-ui', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
    logger.log(
      `Swagger doc available at /swagger-ui-json and /swagger-ui-yaml, swagger ui available at /swagger-ui`,
    );
  };
}

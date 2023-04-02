import {
  MiddlewareConsumer,
  Module,
  ModuleMetadata,
  NestModule,
  Type,
} from '@nestjs/common';
import { NestConfigModule } from '../../config/config.module';

export function createControllerModule(
  controller: Type<any>,
  imports?: ModuleMetadata['imports'],
): Type<NestModule> {
  const decorator = Module({
    imports: [NestConfigModule, ...(imports ?? [])],
    controllers: [controller],
    providers: [controller],
  });
  class ApiControllerModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
      // consumer.apply(Middleware).forRoutes(controller);
    }
  }
  const DecoratedModule = Object.defineProperty(
    decorator(ApiControllerModule) || ApiControllerModule,
    'name',
    {
      get() {
        return controller.name + 'Module';
      },
    },
  );

  return DecoratedModule;
}

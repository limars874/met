import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule, Module } from '@nestjs/common';
import config from './mikro-orm.config';

@Module({})
export class EnrichMikroOrmModule {
  static forRoot(): DynamicModule {
    return {
      module: EnrichMikroOrmModule,
      imports: [MikroOrmModule.forRoot({ ...config })],
      exports: [MikroOrmModule.forRoot({ ...config })],
    };
  }
  static forTest(): DynamicModule {
    return {
      module: EnrichMikroOrmModule,
      imports: [
        MikroOrmModule.forRoot({ ...config, allowGlobalContext: true }),
      ],
      exports: [
        MikroOrmModule.forRoot({ ...config, allowGlobalContext: true }),
      ],
    };
  }
}

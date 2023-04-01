import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { NestConfigModule } from './config.module';

describe('ProductService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [NestConfigModule],
    }).compile();

    service = module.get(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should be get database config', () => {
    expect(service.get('database')).toMatchObject({
      host: expect.any(String),
      port: expect.any(Number),
      dbName: expect.any(String),
      password: expect.any(String),
      username: expect.any(String),
    });
  });
});

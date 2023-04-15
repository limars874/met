import { Test } from '@nestjs/testing';
import { NestConfigModule } from '../../../config/config.module';
import { JwtService } from './jwt.service';

describe('ConfigService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [NestConfigModule],
      providers: [JwtService],
    }).compile();

    service = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should be create access token and verify it', () => {
    const payload = {
      id: '1',
      isCreator: true,
      isVerified: true,
      isEmailVerified: true,
      isPendingMerge: true,
      isLocked: true,
    };
    const expectPayload = {
      isCreator: payload.isCreator,
      isVerified: payload.isVerified,
      isEmailVerified: payload.isEmailVerified,
      isPendingMerge: payload.isPendingMerge,
      isLocked: payload.isLocked,
      sub: payload.id,
      iat: expect.any(Number),
      exp: expect.any(Number),
    };
    const token = service.createAccessToken(payload);
    expect(token).toMatch(/.+/);
    expect(() => service.verifyAccessToken('dd')).toThrow();
    const verify = service.verifyAccessToken(token);
    expect(verify).toMatchObject(expectPayload);
    const decode = service.decodeAccessToken(token);
    expect(decode).toMatchObject(expectPayload);
  });

  it('should be create refresh token and verify it', () => {
    const payload = {
      id: '1',
      isCreator: true,
      isVerified: true,
      isEmailVerified: true,
      isPendingMerge: true,
      isLocked: true,
    };
    const expectPayload = {
      sub: payload.id,
      iat: expect.any(Number),
      exp: expect.any(Number),
    };
    const token = service.createRefreshToken(payload);
    expect(token).toMatch(/.+/);
    expect(() => service.verifyRefreshToken('dd')).toThrow();
    const verify = service.verifyRefreshToken(token);
    expect(verify).toMatchObject(expectPayload);
  });
});

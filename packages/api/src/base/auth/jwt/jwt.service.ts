import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { AuthRecord } from '../core/auth-record';
import { jwtAuthConfig, jwtRefreshConfig } from './jwt.config';
import { BASE_CLAIMS } from './jwt.constants';
import { JwtAuthPayload, JwtRefreshPayload } from './jwt.payload';

@Injectable()
export class JwtService {
  private jwtAuthService: NestJwtService;
  private jwtRefreshService: NestJwtService;

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.jwtAuthService = new NestJwtService(
      jwtAuthConfig.useFactory(this.configService),
    );

    this.jwtRefreshService = new NestJwtService(
      jwtRefreshConfig.useFactory(this.configService),
    );
  }

  createAccessToken(authRecord: AuthRecord): string {
    const payload: JwtAuthPayload = {
      sub: authRecord.id,
      isVerified: !!authRecord.isVerified,
      isCreator: !!authRecord.isCreator,
      isEmailVerified: authRecord.isEmailVerified,
      isPendingMerge: authRecord.isPendingMerge,
      isLocked: authRecord.isLocked ? true : undefined,
      ...BASE_CLAIMS,
    };
    return this.jwtAuthService.sign(payload);
  }

  verifyAccessToken(token: string) {
    return this.jwtAuthService.verify(token) as JwtAuthPayload;
  }

  decodeAccessToken(token: string): JwtAuthPayload {
    return this.jwtAuthService.decode(token) as JwtAuthPayload;
  }

  createRefreshToken(authRecord: AuthRecord) {
    const payload: JwtRefreshPayload = {
      sub: authRecord.id,
      ...BASE_CLAIMS,
    };
    return this.jwtRefreshService.sign(payload);
  }

  verifyRefreshToken(token: string) {
    return this.jwtRefreshService.verify(token) as JwtAuthPayload;
  }

  decodeRefreshToken(token: string): JwtAuthPayload {
    return this.jwtRefreshService.decode(token) as JwtAuthPayload;
  }
}

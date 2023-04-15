import { ConfigService } from '@nestjs/config';

export const jwtAuthConfig = {
  useFactory: (configService: ConfigService) => {
    return {
      secret: configService.get('jwt').secret,
      signOptions: {
        expiresIn: configService.get('jwt').accessExpiry,
      },
    };
  },
  inject: [ConfigService],
};

export const jwtRefreshConfig = {
  useFactory: (configService: ConfigService) => {
    return {
      secret: configService.get('jwt').refreshTokenSecret,
      signOptions: {
        expiresIn: configService.get('jwt').refreshTokenExpiresIn,
      },
    };
  },
  inject: [ConfigService],
};

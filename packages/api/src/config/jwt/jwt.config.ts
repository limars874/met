import { registerAs } from '@nestjs/config';

export const jwt = registerAs('jwt', () => ({
  accessExpiry: process.env.JWT_ACCESS_EXPIRY,
  refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  rememberMeExpiresIn: process.env.JWT_REMEMBER_ME_EXPIRES_IN,
  secret: process.env.JWT_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
}));

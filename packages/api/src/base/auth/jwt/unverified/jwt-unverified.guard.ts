import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { JWT_UNVERIFIED_NAME } from './jwt-unverified.constants'

@Injectable()
export class JwtUnverifiedGuard extends AuthGuard(JWT_UNVERIFIED_NAME) {}

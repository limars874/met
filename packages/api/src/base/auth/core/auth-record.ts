import { OmitType } from '@nestjs/swagger'

import { JwtAuthPayload } from '../jwt/jwt.payload'

/**
 * This is our internal record of a user attempting authentication. It contains
 * all fields from the JWT (JwtAuthPayload), with "sub" swapped with "id" (since
 * it makes more sense internally). It also contains internal auth state like
 * email verification status and whether or not the account is pending a merge.
 */
export class AuthRecord extends OmitType(JwtAuthPayload, ['sub'] as const) {
  id: string

  constructor(init: AuthRecord) {
    super()
    Object.assign(this, init)
  }
}

class JwtBasePayload {
  sub: string
}

export class JwtAuthPayload extends JwtBasePayload {
  isVerified: boolean
  isCreator: boolean
  // Only set during auth for unverified users
  isEmailVerified?: boolean
  isPendingMerge?: boolean
  // Only set for a blocked user
  isLocked?: boolean
}

export type JwtRefreshPayload = JwtBasePayload

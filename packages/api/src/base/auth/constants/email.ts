import ms from 'ms'

export const EMAIL_VERIFY_EXPIRATION_MS = ms('1 hour') // Used for both signup and change
export const EMAIL_RESET_PASSWORD_EXPIRATION_MS = ms('1 hour')

export const EMAIL_SET_MAX_COUNT_PER_TIMEFRAME = 4
export const EMAIL_SET_TIME_SPAN_MS = ms('1 hour')

export const EMAIL_CHANGE_INITIATE_MAX_COUNT_PER_TIMEFRAME = 2
export const EMAIL_CHANGE_INITIATE_TIME_SPAN_MS = ms('1 day')

export const EMAIL_CHANGE_CONFIRM_MAX_COUNT_PER_TIMEFRAME = 5
export const EMAIL_CHANGE_CONFIRM_TIME_SPAN_MS = ms('1 hour')

export const EMAIL_CHANGE_CONFIRMATION_CODE_LENGTH = 6

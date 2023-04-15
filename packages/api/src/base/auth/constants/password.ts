// Minimum eight characters, at least one letter and one number
export const PASSWORD_MIN_LENGTH = 8 // @share-with-frontend auth
export const PASSWORD_MAX_LENGTH = 1000 // @share-with-frontend auth
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z])(?=\S+$).{8,}$/ // @share-with-frontend auth

export const PASSWORD_BCRYPT_SALT_ROUNDS = 12

export const PASSWORD_VALIDATION_ERROR_MESSAGE =
  'Password must contain at least eight characters, one letter, and one number'

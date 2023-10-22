export const SERVER_NON_API_ERROR_REGEX = new RegExp(process.env.NEXT_PUBLIC_SERVER_NON_API_ERROR_REGEX)
export const __prod__ = process.env.NODE_ENV === 'production'
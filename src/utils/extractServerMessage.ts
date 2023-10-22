import { SERVER_NON_API_ERROR_REGEX } from 'src/constants'

export const extractServerMessage = (msg: string) => {
  return SERVER_NON_API_ERROR_REGEX.exec(msg)[0]
}
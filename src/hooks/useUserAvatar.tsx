import { useAvatarUrlQuery, useGetSignedUrlQuery } from 'src/generated/graphql'
import { useUser } from './useUser'

export const useUserAvatar = () => {
  const [{ data }] = useAvatarUrlQuery()
  return data?.avatarUrl
}
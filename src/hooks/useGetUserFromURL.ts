import { useRouter } from 'next/router'
import { useUserQuery } from 'src/generated/graphql'

export const useGetUserFromURL = () => {
  const router = useRouter()
  const user = typeof router.query.user == 'string' ? router.query.user : '-1'
  return useUserQuery({
    pause: user == '-1',
    variables: {
      username: user
    }
  })
}
import { useRouter } from 'next/router'
import { useSpaceQuery } from 'src/generated/graphql'

export const useGetSpaceFromURL = () => {
  const router = useRouter()
  const space =  typeof router.query.space == 'string' ? router.query.space : '-1'
  return useSpaceQuery({
    pause: space == '-1',
    variables: {
      spaceName: space
    }
  })
}
import { useRouter } from 'next/router'
import { usePageQuery } from 'src/generated/graphql'

export const useGetPageFromURL = () => {
  const router = useRouter()
  const page =  typeof router.query.page == 'string' ? router.query.page : '-1'
  return usePageQuery({
    pause: page == '-1',
    variables: {
      pageName: page
    }
  })
}
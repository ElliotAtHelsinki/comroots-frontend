import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMeQuery } from 'src/generated/graphql'

export const useIsAuth = (autoRedirect: boolean) => {
  const [{ data, fetching }] = useMeQuery()
  const router = useRouter()

  const redirectLogin = () => {
    router.replace('/login?next=' + router.asPath)
  }

  useEffect(() => {
    if (!fetching && !data?.me && autoRedirect) {
      redirectLogin()
    }
  }, [data, router, fetching])

  return {
    redirectLogin
  }
}
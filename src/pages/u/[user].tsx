import { Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { Layout, Profile, TabButtons, UserMain, UserOffers, UserPosts } from 'src/components'
import { useAppliedOffersQuery, useOffersQuery, usePostsQuery } from 'src/generated/graphql'
import { useGetUserFromURL, useTriggerInvalidates, useUser } from 'src/hooks'
import { createURQLClient } from 'src/utils'

interface UserProps {

}

const User: NextPage<UserProps> = () => {
  useTriggerInvalidates()
  const router = useRouter()
  const me = useUser()
  const [tab, setTab] = useState('main')
  const [{ data, fetching }] = useGetUserFromURL()
  const userId = useMemo(() => data?.user?.id, [data])

  const [postsVariables, setPostsVariables] = useState<{ limit: number, cursor: string | null, userId: number }>
    ({ limit: 7, cursor: null, userId })
  const [offersVariables, setOffersVariables] = useState<{ limit: number, cursor: string | null, userId: number }>
    ({ limit: 7, cursor: null, userId })
  useEffect(() => {
    setPostsVariables({ ...postsVariables, userId })
    setOffersVariables({ ...offersVariables, userId })
  }, [userId])
  const [{ data: postsData, fetching: postsFetching }] = usePostsQuery({ variables: postsVariables, pause: !data?.user?.id })
  const [{ data: offersData, fetching: offersFetching }] = useOffersQuery({ variables: offersVariables, pause: !data?.user?.id })
  const [{ data: appliedOffersData, fetching: appliedOffersFetching }] = useAppliedOffersQuery({ pause: !data?.user?.id })

  const docTitle = `u/${router.query.user} | Comroots`

  return (
    <>
      <Head>
        <title>{docTitle}</title>
        <meta property='og:title' content={`u/${router.query.user} | Comroots`} key='title' />
        <meta name='description' content={`u/${router.query.user}`} />
      </Head>
      <Layout>
        <Profile data={data} fetching={fetching} me={me} />
        <Box mt={10}>
          <TabButtons tabs={['main', 'posts', 'offers']} defaultTab={tab} setActive={setTab} />
        </Box>
        {
          tab == 'main' &&
          <UserMain data={data} me={me} />
        }
        {
          tab === 'posts' &&
          <UserPosts me={me} postsData={postsData} postsFetching={postsFetching} postsVariables={postsVariables} setPostsVariables={setPostsVariables} />
        }
        {
          tab == 'offers' &&
          <UserOffers appliedOffersData={appliedOffersData} appliedOffersFetching={appliedOffersFetching} me={me} offersData={offersData} offersFetching={offersFetching} offersVariables={offersVariables} setOffersVariables={setOffersVariables} userId={userId} />
        }
      </Layout>
    </>
  )
}

export default withUrqlClient(createURQLClient, { ssr: false })(User)
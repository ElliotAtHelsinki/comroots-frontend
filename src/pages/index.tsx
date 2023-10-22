import type { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { useState } from 'react'
import { IndexOffers, IndexPosts, Layout, TabButtons } from 'src/components'
import { useOffersQuery, usePostsQuery } from 'src/generated/graphql'
import { useTriggerInvalidates, useUser } from 'src/hooks'
import { createURQLClient } from 'src/utils'

const Home: NextPage = () => {
  useTriggerInvalidates()
  const user = useUser()
  const [tab, setTab] = useState('posts')

  const [postsVariables, setPostsVariables] = useState<{ limit: number, cursor: string | null }>
    ({ limit: 7, cursor: null })
  const [offersVariables, setOffersVariables] = useState<{ limit: number, cursor: string | null }>
    ({ limit: 7, cursor: null })
  const [{ data: postsData, fetching: postsFetching }] = usePostsQuery({ variables: postsVariables })
  const [{ data: offersData, fetching: offersFetching }] = useOffersQuery({ variables: offersVariables })

  return (
    <>
      <Head>
        <title>Comroots</title>
        <meta property='og:title' content='Comroots' key='title' />
        <meta name='description' content='Comroots helps you find extracurricular activities like clubs, job offers, and internships.' />
      </Head>
      <Layout>
        <TabButtons tabs={['posts', 'offers']} defaultTab={tab} setActive={setTab} />
        {
          tab == 'posts' &&
          <IndexPosts postsData={postsData} postsFetching={postsFetching} postsVariables={postsVariables} setPostsVariables={setPostsVariables} user={user} />
        }
        {
          tab === 'offers' &&
          <IndexOffers offersData={offersData} offersFetching={offersFetching} offersVariables={offersVariables} setOffersVariables={setOffersVariables} user={user} />
        }
      </Layout>
    </>
  )
}

export default withUrqlClient(createURQLClient, { ssr: false })(Home)
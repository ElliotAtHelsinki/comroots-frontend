import { Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Layout, PageMain, PageOffers, PagePosts, PageProfile, TabButtons } from 'src/components'
import { useGetSignedUrlQuery, useOffersQuery, usePostsQuery } from 'src/generated/graphql'
import { useTriggerInvalidates, useUser } from 'src/hooks'
import { useGetPageFromURL } from 'src/hooks/useGetPageFromURL'
import { createURQLClient } from 'src/utils'

interface PageProps {

}

const Page: NextPage<PageProps> = () => {
  useTriggerInvalidates()
  const router = useRouter()
  const [{ data, fetching }] = useGetPageFromURL()
  const user = useUser()
  const [avatarKey, setAvatarKey] = useState(data?.page?.avatar)
  const [coverPhotoKey, setCoverPhotoKey] = useState(data?.page?.coverPhoto)
  useEffect(() => {
    setAvatarKey(data?.page?.avatar)
    setCoverPhotoKey(data?.page?.coverPhoto)
  }, [data])
  const [{ data: pageAvatarData }] = useGetSignedUrlQuery({
    pause: !avatarKey,
    variables: {
      key: avatarKey
    }
  })
  const [{ data: pageCoverPhotoData }] = useGetSignedUrlQuery({
    pause: !coverPhotoKey,
    variables: {
      key: coverPhotoKey
    }
  })
  const [tab, setTab] = useState('posts')

  const [postsVariables, setPostsVariables] = useState<{ limit: number, cursor: string | null, pageId: number }>
    ({ limit: 7, cursor: null, pageId: data?.page?.id })
  const [offersVariables, setOffersVariables] = useState<{ limit: number, cursor: string | null, pageId: number }>
    ({ limit: 7, cursor: null, pageId: data?.page?.id })
  useEffect(() => {
    setPostsVariables({ ...postsVariables, pageId: data?.page?.id })
    setOffersVariables({ ...offersVariables, pageId: data?.page?.id })
  }, [data?.page?.id])
  const [{ data: postsData, fetching: postsFetching }] = usePostsQuery({ variables: postsVariables, pause: tab != 'posts' || !data?.page?.id })
  const [{ data: offersData, fetching: offersFetching }] = useOffersQuery({ variables: offersVariables, pause: tab != 'offers' || !data?.page?.id })
  const docTitle = `p/${router.query.page} | Comroots`

  return (
    <>
      <Head>
        <title>{docTitle}</title>
        <meta property='og:title' content={`p/${router.query.page} | Comroots`} key='title' />
        <meta name='description' content={`p/${router.query.page}`} />
      </Head>
      <Layout>
        <PageProfile data={data} fetching={fetching} pageAvatarData={pageAvatarData} pageCoverPhotoData={pageCoverPhotoData} setAvatarKey={setAvatarKey} setCoverPhotoKey={setCoverPhotoKey} />
        <Box mt={10}>
          <TabButtons tabs={['posts', 'offers', 'main']} defaultTab={tab} setActive={setTab} />
        </Box>
        {
          tab === 'posts' &&
          <PagePosts postsData={postsData} postsFetching={postsFetching} postsVariables={postsVariables} setPostsVariables={setPostsVariables} user={user} />
        }
        {
          tab === 'offers' &&
          <PageOffers offersData={offersData} offersFetching={offersFetching} offersVariables={offersVariables} setOffersVariables={setOffersVariables} user={user} />
        }
        {
          tab == 'main' &&
          <PageMain data={data} />
        }
      </Layout>
    </>
  )
}

export default withUrqlClient(createURQLClient, { ssr: false })(Page)
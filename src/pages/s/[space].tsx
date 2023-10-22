import { Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Layout, SpaceMain, SpaceOffers, SpacePosts, SpaceProfile, TabButtons } from 'src/components'
import { useGetSignedUrlQuery, useOffersQuery, usePostsQuery, useSpaceAvatarsQuery } from 'src/generated/graphql'
import { useCheckPageOwnership, useGetSpaceFromURL, useTriggerInvalidates, useUser } from 'src/hooks'
import { createURQLClient } from 'src/utils'

interface SpaceProps {

}

const Space: NextPage<SpaceProps> = () => {
  useTriggerInvalidates()
  const router = useRouter()
  const user = useUser()
  const [{ data, fetching }] = useGetSpaceFromURL()
  const spaceId = useMemo(() => data?.space?.id, [data])

  const [avatarKey, setAvatarKey] = useState(data?.space?.avatar)
  const [coverPhotoKey, setCoverPhotoKey] = useState(data?.space?.coverPhoto)
  useEffect(() => {
    setAvatarKey(data?.space?.avatar)
    setCoverPhotoKey(data?.space?.coverPhoto)
  }, [data])
  const [{ data: spaceAvatarData }] = useGetSignedUrlQuery({
    pause: !avatarKey,
    variables: {
      key: avatarKey
    }
  })
  const [{ data: spaceCoverPhotoData }] = useGetSignedUrlQuery({
    pause: !coverPhotoKey,
    variables: {
      key: coverPhotoKey
    }
  })

  const [tab, setTab] = useState('posts')

  const [postsVariables, setPostsVariables] = useState<{ limit: number, cursor: string | null, spaceId: number }>
    ({ limit: 7, cursor: null, spaceId })
  const [offersVariables, setOffersVariables] = useState<{ limit: number, cursor: string | null, spaceId: number }>
    ({ limit: 7, cursor: null, spaceId })
  useEffect(() => {
    setPostsVariables({ ...postsVariables, spaceId })
    setOffersVariables({ ...offersVariables, spaceId })
  }, [spaceId])
  const [{ data: postsData, fetching: postsFetching }] = usePostsQuery({ variables: postsVariables, pause: tab != 'posts' || !data?.space?.id })
  const [{ data: offersData, fetching: offersFetching }] = useOffersQuery({ variables: offersVariables, pause: tab != 'offers' || !data?.space?.id })
  const docTitle = `s/${router.query.space} | Comroots`

  return (
    <>
      <Head>
        <title>{docTitle}</title>
        <meta property='og:title' content={`s/${router.query.space} | Comroots`} key='title' />
        <meta name='description' content={`s/${router.query.space}`} />
      </Head>
      <Layout>
        <SpaceProfile data={data} fetching={fetching} setAvatarKey={setAvatarKey} setCoverPhotoKey={setCoverPhotoKey} spaceAvatarData={spaceAvatarData} spaceCoverPhotoData={spaceCoverPhotoData} />
        <Box mt={10}>
          <TabButtons tabs={['posts', 'offers', 'main']} defaultTab={tab} setActive={setTab} />
        </Box>
        {
          tab === 'posts' &&
          <SpacePosts postsData={postsData} postsFetching={postsFetching} postsVariables={postsVariables} setPostsVariables={setPostsVariables} user={user} />
        }
        {
          tab === 'offers' &&
          <SpaceOffers offersData={offersData} offersFetching={offersFetching} offersVariables={offersVariables} setOffersVariables={setOffersVariables} user={user} />
        }
        {
          tab == 'main' &&
          <SpaceMain data={data} />
        }
      </Layout >
    </>
  )
}

export default withUrqlClient(createURQLClient, { ssr: false })(Space)
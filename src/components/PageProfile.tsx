import { Avatar, Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { Box as MUIBox } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { GetSignedUrlQuery, PageQuery } from 'src/generated/graphql'
import { ChangePageAvatarButton } from './ChangePageAvatarButton'
import { ChangePageCoverPhotoButton } from './ChangePageCoverPhotoButton'
import { FollowPageButton } from './FollowPageButton'
import { UpdatePageInfoButton } from './UpdatePageInfoButton'

interface PageProfileProps {
  data: PageQuery
  pageCoverPhotoData: GetSignedUrlQuery
  pageAvatarData: GetSignedUrlQuery
  fetching: boolean
  setAvatarKey: Dispatch<SetStateAction<string>>
  setCoverPhotoKey: Dispatch<SetStateAction<string>>
}

export const PageProfile = (props: PageProfileProps): JSX.Element => {
  const { data, pageCoverPhotoData, setCoverPhotoKey, pageAvatarData, setAvatarKey, fetching } = props
  return (
    <Box w='full' bgColor='white' shadow='lg' mb='4' position='relative'>
      <Image src={pageCoverPhotoData?.getSignedUrl} alt='page-cover-photo' fallbackSrc='/samples/coverPhoto.webp' w='full' h='9.5rem' />
      {
        data?.page?.ownerStatus &&
        <ChangePageCoverPhotoButton data={data} setCoverPhotoKey={setCoverPhotoKey} />
      }
      <MUIBox sx={{ div: { fontSize: '2.25rem' } }}>
        <Avatar
          name='p /'
          src={pageAvatarData?.getSignedUrl}
          bgColor={pageAvatarData?.getSignedUrl ? 'transparent' : 'green.400'}
          color='white'
          size='2xl'
          position='absolute'
          zIndex={1}
          top='5.25rem'
          left='3rem'
          mr={6}
          objectPosition='relative'
        />
      </MUIBox>
      <Flex flexDir='column' position='relative' w='full' pt='74px' pl='3rem' pb='3rem' pr='3rem'>
        {
          data?.page?.ownerStatus &&
          <>
            <UpdatePageInfoButton data={data} />
            <ChangePageAvatarButton data={data} setAvatarKey={setAvatarKey} />
          </>
        }
        <FollowPageButton
          data={data}
          top={6}
          right={data?.page?.ownerStatus ? '280px' : '3rem'}
        />
        <Heading size='lg'>
          {data?.page?.pageName ? data?.page?.fullPageName ? data.page.fullPageName : `p/${data.page.pageName}` : fetching ? 'Loading...' : 'Page not found.'}
        </Heading>
        {
          data?.page?.fullPageName &&
          <Text color='gray.600'>p/{data?.page?.pageName}</Text>
        }
        <Heading size='md' mt={2}>{data?.page?.headline}</Heading>
        <Text color='gray.600' >{data?.page?.address}</Text>
        <Flex mt={2}>
          <Flex>
            <Text color='gray.700'>{Number(data?.page?.followerNumber).toLocaleString()}</Text>
            <Text color='gray.600'>&nbsp;followers</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
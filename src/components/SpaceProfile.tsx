import { Box, Text, Avatar, Flex, Heading, Image } from '@chakra-ui/react'
import { Box as MUIBox } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { SpaceQuery, GetSignedUrlQuery } from 'src/generated/graphql'
import { ChangeSpaceAvatarButton } from './ChangeSpaceAvatarButton'
import { ChangeSpaceCoverPhotoButton } from './ChangeSpaceCoverPhotoButton'
import { SubscribeSpaceButton } from './SubscribeSpaceButton'
import { UpdateSpaceInfoButton } from './UpdateSpaceInfoButton'

interface SpaceProfileProps {
  data: SpaceQuery
  fetching: boolean
  spaceCoverPhotoData: GetSignedUrlQuery
  spaceAvatarData: GetSignedUrlQuery
  setAvatarKey: Dispatch<SetStateAction<string>>
  setCoverPhotoKey: Dispatch<SetStateAction<string>>
}

export const SpaceProfile = (props: SpaceProfileProps): JSX.Element => {
  const { data, fetching, spaceCoverPhotoData, spaceAvatarData, setAvatarKey, setCoverPhotoKey } = props
  return (
    <Box w='full' bgColor='white' shadow='lg' mb='4' position='relative'>
      <Image src={spaceCoverPhotoData?.getSignedUrl} alt='space-cover-photo' fallbackSrc='/samples/coverPhoto.webp' w='full' h='9.5rem' />
      {
        data?.space?.modStatus &&
        <ChangeSpaceCoverPhotoButton data={data} setCoverPhotoKey={setCoverPhotoKey} />
      }
      <MUIBox sx={{ div: { fontSize: '2.25rem' } }}>
        <Avatar
          name='s /'
          src={spaceAvatarData?.getSignedUrl}
          bgColor={spaceAvatarData?.getSignedUrl ? 'transparent' : 'green.400'}
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
          data?.space?.modStatus &&
          <>
            <UpdateSpaceInfoButton data={data} />
            <ChangeSpaceAvatarButton data={data} setAvatarKey={setAvatarKey} />
          </>
        }
        <SubscribeSpaceButton
          data={data}
          top={6}
          right={data?.space?.modStatus ? '280px' : '3rem'}
        />
        <Heading size='lg'>
          {data?.space?.spaceName ? data?.space?.fullSpaceName ? data.space.fullSpaceName : `s/${data.space.spaceName}` : fetching ? 'Loading...' : 'Space not found.'}
        </Heading>
        {
          data?.space?.fullSpaceName &&
          <Text color='gray.600'>s/{data?.space?.spaceName}</Text>
        }
        <Heading size='md' mt={2}>{data?.space?.headline}</Heading>
        <Flex mt={2}>
          <Flex>
            <Text color='gray.700'>{Number(data?.space?.subscriberNumber).toLocaleString()}</Text>
            <Text color='gray.600'>&nbsp;subscribers</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
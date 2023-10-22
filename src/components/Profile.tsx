import { Avatar, Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { ChangeAvatarButton } from './ChangeAvatarButton'
import { ChangeCoverPhotoButton } from './ChangeCoverPhotoButton'
import { FollowUserButton } from './FollowUserButton'
import { Interpunct } from './Interpunct'
import { UpdateInfoButton } from './UpdateInfoButton'
import { Box as MUIBox } from '@mui/material'
import { MeQuery, useGetSignedUrlQuery, UserQuery } from 'src/generated/graphql'
import { useEffect, useState } from 'react'

interface ProfileProps {
  data: UserQuery
  fetching: boolean
  me: MeQuery['me']
}

export const Profile = (props: ProfileProps): JSX.Element => {
  const { data, fetching, me } = props
  const [avatarKey, setAvatarKey] = useState(data?.user?.avatar)
  const [coverPhotoKey, setCoverPhotoKey] = useState(data?.user?.coverPhoto)
  useEffect(() => {
    setAvatarKey(data?.user?.avatar)
    setCoverPhotoKey(data?.user?.coverPhoto)
  }, [data])
  const [{ data: avatarData }] = useGetSignedUrlQuery({
    pause: !avatarKey,
    variables: {
      key: avatarKey
    }
  })
  const [{ data: coverPhotoData }] = useGetSignedUrlQuery({
    pause: !coverPhotoKey,
    variables: {
      key: coverPhotoKey
    }
  })

  return (
    <Box w='full' bgColor='white' shadow='lg' mb='4' position='relative'>
      <Image src={coverPhotoData?.getSignedUrl} alt='profile-cover-photo' fallbackSrc='/samples/coverPhoto.webp' w='full' h='9.5rem' />
      {
        data?.user?.id == me?.id &&
        <ChangeCoverPhotoButton data={data} setCoverPhotoKey={setCoverPhotoKey} />
      }
      <MUIBox sx={{ div: { fontSize: '2.25rem' } }}>
        <Avatar
          name='u /'
          src={avatarData?.getSignedUrl}
          bgColor={avatarData?.getSignedUrl ? 'transparent' : 'green.400'}
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
          data?.user?.id == me?.id ?
            <>
              <UpdateInfoButton data={data} />
              <ChangeAvatarButton data={data} setAvatarKey={setAvatarKey} />
            </>
            :
            <FollowUserButton data={data} />
        }
        <Heading size='lg'>
          {data?.user?.username ? data?.user?.fullName ? data.user.fullName : `u/${data.user.username}` : fetching ? 'Loading...' : 'User not found.'}
        </Heading>
        {
          data?.user?.fullName &&
          <Text color='gray.600'>u/{data?.user?.username}</Text>
        }
        <Heading size='md' mt={2}>{data?.user?.headline}</Heading>
        <Text color='gray.600' >{data?.user?.address}</Text>
        <Flex mt={2}>
          <Flex>
            <Text color='gray.700'>{Number(data?.user?.followerNumber).toLocaleString()}</Text>
            <Text color='gray.600'>&nbsp;followers</Text>
          </Flex>
          <Interpunct />
          <Flex>
            <Text color='gray.700'>{Number(data?.user?.followingNumber).toLocaleString()}</Text>
            <Text color='gray.600'>&nbsp;following</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
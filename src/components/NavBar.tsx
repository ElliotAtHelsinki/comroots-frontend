import { Avatar, Box, Button, Flex, Link, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useGetSignedUrlQuery, useLogoutMutation, useMeQuery } from 'src/generated/graphql'
import { ContainedButton } from './ContainedButton'
import { LogoButton } from './LogoButton'
import { NoUnderlineLink } from './NoUnderlineLink'
import { OutlinedButton } from './OutlinedButton'

interface NavBarProps {
  shadow?: boolean
}

export const NavBar = (props: NavBarProps): JSX.Element => {
  const { shadow = true } = props
  const [{ data, fetching }] = useMeQuery()

  const [{ data: avatarData }] = useGetSignedUrlQuery({
    pause: !data?.me?.avatar,
    variables: {
      key: data?.me?.avatar,
    }
  })
  const router = useRouter()
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [showCreatePost, setShowCreatePost] = useState(true)
  const [showCreateOffer, setShowCreateOffer] = useState(true)
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (windowRef?.current?.clientWidth < 532) {
      setShowCreatePost(false)
      setShowCreateOffer(false)
    }
    else if (windowRef?.current?.clientWidth < 684) {
      setShowCreatePost(false)
      setShowCreateOffer(true)
    }
    else {
      setShowCreatePost(true)
      setShowCreateOffer(true)
    }
  }, [windowRef?.current?.clientWidth])

  let userSection = null
  if (fetching) { }     // data is loading
  else if (!data?.me) { // user not logged in
    userSection =
      <>
        <NextLink passHref href='/login'>
          <OutlinedButton as={NoUnderlineLink} w='6.5rem' mr={5}>
            Login
          </OutlinedButton>
        </NextLink>
        <NextLink passHref href='/sign-up'>
          <ContainedButton as={NoUnderlineLink} w='6.5rem'>
            Register
          </ContainedButton>
        </NextLink>
      </>
  }
  else {                // user logged in
    userSection =
      <Flex alignItems='center'>
        {
          (!router?.asPath.includes('create-post') && showCreatePost) &&
          <NextLink passHref href='/create-post'>
            <ContainedButton as={NoUnderlineLink} mr={4} w='32'>
              Create Post
            </ContainedButton>
          </NextLink>
        }
        {
          (!router?.asPath.includes('create-offer') && showCreateOffer) &&
          <NextLink passHref href='/create-offer'>
            <OutlinedButton as={NoUnderlineLink} mr={6} w='32'>
              Create Offer
            </OutlinedButton>
          </NextLink>
        }
        <Popover>
          <PopoverTrigger>
            <Avatar
              name={data?.me?.username}
              src={avatarData?.getSignedUrl}
              w='40px'
              h='40px'
              mr={6}
            />
          </PopoverTrigger>
          <PopoverContent boxShadow='none !important'>
            <PopoverArrow />
            <PopoverBody>
              <VStack align='stretch'>
                <NextLink passHref href='/u/[user]' as={`/u/${data.me.username}`}>
                  <Button as={NoUnderlineLink} color='green.400'>Profile</Button>
                </NextLink>
                <NextLink passHref href='/manage-pages'>
                  <Button as={NoUnderlineLink} color='green.400'>Manage Pages</Button>
                </NextLink>
                <NextLink passHref href='/manage-spaces'>
                  <Button as={NoUnderlineLink} color='green.400'>Manage Spaces</Button>
                </NextLink>
                <NextLink passHref href='/chat'>
                  <Button as={NoUnderlineLink} color='green.400'>Chat</Button>
                </NextLink>
                <NextLink passHref href='/dashboard'>
                  <Button as={NoUnderlineLink} color='green.400'>Dashboard</Button>
                </NextLink>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Button
          onClick={async () => {
            await logout()
            router.reload()
          }}
          isLoading={logoutFetching}
          color='blackAlpha.600'
        >
          Logout
        </Button>
      </Flex>
  }
  return (
    <Flex ref={windowRef} position='fixed' zIndex='1402' w='full' alignItems='center' h='50px' pl='20' pr='20' bgColor='white' shadow={!shadow ? 'none' : 'lg'} mb={4}>
      <NextLink passHref href='/'>
        <Link>
          <LogoButton />
        </Link>
      </NextLink>
      <Box ml='auto'>{userSection}</Box>
    </Flex>
  )
}
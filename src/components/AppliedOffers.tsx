import { Box, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react'
import capitalize from 'lodash/capitalize'
import { DateTime } from 'luxon'
import NextLink from 'next/link'
import { AppliedOffersQuery } from 'src/generated/graphql'
import { useCheckPageOwnership, useUser } from 'src/hooks'
import { EditDeleteOfferButtons } from './EditDeleteOfferButtons'

interface AppliedOffersProps {
  me: ReturnType<typeof useUser>
  appliedOffersData: AppliedOffersQuery
  appliedOffersFetching: boolean
}

export const AppliedOffers = (props: AppliedOffersProps): JSX.Element => {
  const { me, appliedOffersData, appliedOffersFetching } = props
  const checkPageOwnership = useCheckPageOwnership()

  return (
    <>
      {
        !appliedOffersData && appliedOffersFetching ? <Box mt={4}>loading...</Box> :
          <Stack spacing={8} mb={8} mt={8}>
            {
              appliedOffersData.appliedOffers.length > 0 &&
              appliedOffersData.appliedOffers.map(o =>
                o &&
                <Flex key={o.id} pl={5} pr={5} pt={3} pb={3} minH='40' shadow='md' borderWidth='1px' bgColor='white'>
                  <Flex alignItems='center' flex={1}>
                    <Image src={o.photoUrl} alt='offer-photo' fallbackSrc='/samples/square.webp' w='32' h='32' mr={4} />
                    <Box h='full'>
                      <NextLink passHref href='/offer/[id]' as={`/offer/${o.id}`} >
                        <Link color='green.500' _hover={{ textDecor: 'underline', textDecorationColor: 'green.500' }}>
                          <Heading fontSize='xl'>{o.title}</Heading>
                        </Link>
                      </NextLink>
                      <Text fontSize='xs' mb={1} color='blackAlpha.600'>Posted by {o.creatorType == 'user' ? o.creator.username : o.pageCreator.pageName} in s/{o.space?.spaceName}</Text>
                      <Text fontSize='sm' mb={1} color='blackAlpha.600'>{o.workplace}</Text>
                      <Text fontSize='sm' mb={1} color='blackAlpha.600'>{o.address}</Text>
                      <Text fontSize='md' mb={1} color={o.recruiting ? 'green.500' : 'red.500'} fontWeight='bold'>{o.recruiting ? 'Recruiting' : 'Not recruiting'}</Text>
                      <Text fontSize='md' mb={1} fontWeight='bold' color={o.applicationStatus == 'applied' ? 'gray' : o.applicationStatus == 'accepted' ? 'green.500' : 'red.500'}>{capitalize(o.applicationStatus)}</Text>
                      <Text fontSize='sm' color='blackAlpha.600'>{DateTime.fromMillis(parseInt(o.createdAt)).toRelative()}</Text>
                    </Box>
                    {
                      ((me?.id && me.id == o?.creator?.id) || checkPageOwnership(o?.pageCreator?.id)) &&
                      <Flex flexDir='column' justifyContent='space-between' ml='auto' height='calc(80px + 0.25rem)'>
                        <EditDeleteOfferButtons id={o.id} />
                      </Flex>
                    }
                  </Flex>
                </Flex>
              )
            }
          </Stack>
      }
    </>
  )
}
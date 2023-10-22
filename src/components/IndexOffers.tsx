import { Box, Button, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import NextLink from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { OffersQuery } from 'src/generated/graphql'
import { useCheckPageOwnership, useUser } from 'src/hooks'
import { EditDeleteOfferButtons } from './EditDeleteOfferButtons'

interface IndexOffersProps {
  offersData: OffersQuery
  offersFetching: boolean
  user: ReturnType<typeof useUser>
  offersVariables: { limit: number, cursor: string | null }
  setOffersVariables: Dispatch<SetStateAction<{ limit: number, cursor: string | null }>>
}

export const IndexOffers = (props: IndexOffersProps): JSX.Element => {
  const { offersData, offersFetching, user, offersVariables, setOffersVariables } = props
  const checkPageOwnership = useCheckPageOwnership()

  return (
    <>
      {
        !offersData && offersFetching ? <Box mt={4}>loading...</Box> :
          <Stack spacing={8} mb={8} mt={8}>
            {
              offersData?.offers?.offers?.length > 0 &&
              offersData.offers.offers.map(o =>
                o &&
                <Flex key={o.id} pl={5} pr={5} pt={3} pb={3} minH='40' shadow='md' borderWidth='1px' bgColor='white' >
                  <Flex alignItems='center' flex={1}>
                    <Image src={o.photoUrl} fallbackSrc='/samples/square.webp' alt='offer-photo' w='32' h='32' mr={4} />
                    <Box h='full'>
                      <NextLink passHref href='/offer/[id]' as={`/offer/${o.id}`} >
                        <Link color='green.500' _hover={{ textDecor: 'underline', textDecorationColor: 'green.500' }}>
                          <Heading fontSize='xl'>{o.title}</Heading>
                        </Link>
                      </NextLink>
                      <Flex align='center' fontSize='xs' mb={1} color='blackAlpha.600'>
                        <Text>Posted by&nbsp;</Text>
                        <NextLink passHref
                          href={o.creatorType == 'user' ? `/u/[user]` : `/p/[page]`}
                          as={o.creatorType == 'user' ? `/u/${o.creator.username}` : `/p/${o.pageCreator.pageName}`}
                        >
                          <Link>
                            {o.creatorType == 'user' ? `u/${o.creator.username}` : `p/${o?.pageCreator.pageName}`}
                          </Link>
                        </NextLink>
                        <Text>&nbsp;in&nbsp;</Text>
                        <NextLink passHref href='/s/[id]' as={`/s/${o.space.spaceName}`}>
                          <Link>
                            s/{o.space.spaceName}
                          </Link>
                        </NextLink>
                      </Flex>
                      <Text fontSize='sm' mb={1} color='blackAlpha.600'>{o.workplace}</Text>
                      <Text fontSize='sm' mb={1} color='blackAlpha.600'>{o.address}</Text>
                      <Text fontSize='md' mb={1} color={o.recruiting ? 'green.500' : 'red.500'} fontWeight='bold'>{o.recruiting ? 'Recruiting' : 'Not recruiting'}</Text>
                      <Text fontSize='sm' color='blackAlpha.600'>{DateTime.fromMillis(parseInt(o.createdAt)).toRelative()}</Text>
                    </Box>
                    {
                      ((user?.id && user.id == o?.creator?.id) || checkPageOwnership(o?.pageCreator?.id)) &&
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
      {
        offersData?.offers?.hasMore &&
        <Flex>
          <Button
            onClick={() => {
              setOffersVariables({
                limit: offersVariables.limit,
                cursor: offersData.offers.offers[offersData.offers.offers.length - 1].createdAt
              })
            }}
            isLoading={offersFetching}
            m='auto'
            my={8}
          >
            Load more
          </Button>
        </Flex>
      }
    </>
  )
}
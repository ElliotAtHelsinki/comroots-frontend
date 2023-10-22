import { Avatar, Box, Flex, Grid, Heading, Link, Text } from '@chakra-ui/react'
import capitalize from 'lodash/capitalize'
import { DateTime } from 'luxon'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import NextLink from 'next/link'
import NoSSR from 'react-no-ssr'
import { EditDeleteOfferButtons, Interpunct, Layout, OutlinedButton } from 'src/components'
import { useApplyMutation, useDeleteOfferApplicationMutation, useUpdateApplicationStatusMutation } from 'src/generated/graphql'
import { useCheckPageOwnership, useGetOfferFromURL, useRequireLogin, useUser } from 'src/hooks'
import { createURQLClient } from 'src/utils'
const QuillDisplay = dynamic(() => import('src/components/QuillDisplay.client'), { ssr: false })

interface OfferProps {

}

const Offer: NextPage<OfferProps> = () => {
  const user = useUser()
  const checkPageOwnership = useCheckPageOwnership()
  const requireLogin = useRequireLogin()
  const [{ data, error, fetching }] = useGetOfferFromURL()
  const [, apply] = useApplyMutation()
  const [, deleteOfferApplication] = useDeleteOfferApplicationMutation()
  const [, updateApplicationStatus] = useUpdateApplicationStatusMutation()

  let returnValue

  if (fetching) {
    returnValue = <>loading...</>
  }

  else if (error) {
    returnValue = <>{error.message}</>
  }

  else if (!data?.offer) {
    returnValue =
      <Layout>
        <Box>Offer not found.</Box>
      </Layout>
  }

  else {
    returnValue =
      <Layout>
        <Box w='full' p='10' bgColor='white' shadow='lg' mb='4'>
          <Heading mb={4}>{data.offer.title}</Heading>
          <Flex align='center'>
            <Text>{data.offer.workplace}</Text>
            {
              data.offer.workplace &&
              <Interpunct />
            }
            <Text>{data.offer.address}&nbsp;</Text>
            <Text color='blackAlpha.600'>{DateTime.fromMillis(parseInt(data.offer.createdAt)).toRelative()}</Text>
            <Interpunct />
            <Text color='green.400'>{data.offer.applicantsNo} applicants</Text>
          </Flex>
          <Grid mt={4} rowGap='1'>
            {
              data.offer.employmentType &&
              <Flex align='center'>
                <Box className='fa-solid fa-suitcase' color='blackAlpha.700' />
                <Text ml={3}>{data.offer.employmentType}</Text>
              </Flex>
            }
            {
              data.offer.space &&
              <Flex align='center'>
                <Box className='fa-solid fa-solar-system' color='blackAlpha.700' />
                <NextLink passHref href='/s/[id]' as={`/s/${data.offer.space.spaceName}`} >
                  <Link>
                    <Text ml={3}>s/{data.offer.space.spaceName}</Text>
                  </Link>
                </NextLink>
              </Flex>
            }
            {
              data.offer.salaryRange &&
              <Flex align='center'>
                <Box className='fa-solid fa-wallet' color='blackAlpha.700' />
                <Text ml={3}>{data.offer.salaryRange}</Text>
              </Flex>
            }
            {
              data.offer.department &&
              <Flex align='center'>
                <Box className='fa-solid fa-code-branch' color='blackAlpha.700' />
                <Text ml={3}>{data.offer.department}</Text>
              </Flex>
            }
            <Flex align='center'>
              <Box className={`fa-solid fa-eye${!data.offer.recruiting ? '-slash' : ''}`} color={!data.offer.recruiting ? 'red.400' : 'green.400'} />
              <Text ml={!data.offer.recruiting ? '0.4rem' : '0.5rem'} color={!data.offer.recruiting ? 'red.400' : 'green.400'} fontWeight='semibold'>{data.offer.recruiting ? 'Actively recruiting' : 'Not recruiting'}</Text>
            </Flex>
          </Grid>
          {
            (data.offer.creator?.id != user?.id && !['accepted', 'rejected'].includes(data.offer.applicationStatus) && data.offer.recruiting) &&
            <OutlinedButton
              onClick={() => {
                requireLogin()
                if (!data.offer.applicationStatus) {
                  apply({ offerId: data.offer.id })
                }
                else {
                  if (data.offer.applicationStatus == 'applied') {
                    deleteOfferApplication({ offerId: data.offer.id })
                  }
                }
              }}
              color={!data.offer.applicationStatus ? 'green' : 'red'}
              mt={4}
            >
              {
                !data.offer.applicationStatus &&
                'Apply'
              }
              {
                data.offer.applicationStatus == 'applied' &&
                'Unapply'
              }
            </OutlinedButton>
          }
          {
            data.offer.applicationStatus &&
            <Text
              color={data.offer.applicationStatus == 'applied' ? 'gray.500' : data.offer.applicationStatus == 'accepted' ? 'green.500' : 'red.500'}
              fontWeight='bold'
              mt={2}
            >
              {capitalize(data.offer.applicationStatus)}
            </Text>
          }
          <Grid rowGap='2' mt={4}>
            <Box>
              <Text mb={1}>Requirements: </Text>
              <NoSSR onSSR='Loading...'>
                <QuillDisplay value={data.offer.requirements} />
              </NoSSR>
            </Box>
            <Box>
              <Text mb={1}>Benefits: </Text>
              <NoSSR onSSR='Loading...'>
                <QuillDisplay value={data.offer.benefits} />
              </NoSSR>
            </Box>
            <Box>
              <Text mb={1}>Description: </Text>
              <NoSSR onSSR='Loading...'>
                <QuillDisplay value={data.offer.description} />
              </NoSSR>
            </Box>
          </Grid>
          {
            ((user?.id && user.id == data.offer.creator?.id) || checkPageOwnership(data.offer.pageCreator?.id)) &&
            <Flex w='calc(80px + 0.5rem)' mt={4} justifyContent='space-between'>
              <EditDeleteOfferButtons id={data.offer.id} />
            </Flex>
          }
        </Box>
        {
          ((user?.id && user.id == data.offer.creator?.id) || checkPageOwnership(data.offer.pageCreator?.id)) &&
          <Heading size='md' mt={8} mb={4}>Applicants</Heading>
        }
        {
          (user?.id == data.offer.creator?.id && data.offer.applications?.length > 0) &&
          data.offer.applications.map(a => (
            <Flex key={a.id} align='center' pl={5} pr={5} pt={3} pb={3} shadow='md' borderWidth='1px' bgColor='white'>
              <Avatar name={a.user.fullName ?? a.user.username} src={a.user.avatarUrl} mr={4} />
              <NextLink passHref href='/u/[user]' as={`/u/${a.user.username}`}>
                <Link>
                  <Heading size='md'>
                    u/{a.user.username}
                  </Heading>
                </Link>
              </NextLink>
              {
                ['accepted', 'rejected'].includes(a.status) ?
                  <Text color={a.status == 'accepted' ? 'green.500' : 'red.500'} fontWeight='bold' ml='auto' mr='2'>{capitalize(a.status)}</Text>
                  :
                  <>
                    <OutlinedButton onClick={() => { updateApplicationStatus({ id: a.id, status: 'accepted' }) }} ml='auto' mr='4'>Accept</OutlinedButton>
                    <OutlinedButton onClick={() => { updateApplicationStatus({ id: a.id, status: 'rejected' }) }} color='red'>Reject</OutlinedButton>
                  </>
              }
            </Flex>
          ))
        }
      </Layout>
  }

  return (
    <>
      <Head>
        <title>Offer | Comroots</title>
        <meta property='og:title' content='Offer | Comroots' key='title' />
        <meta name='description' content='Offer' />
      </Head>
      {returnValue}
    </>
  )
}

export default withUrqlClient(createURQLClient, { ssr: false })(Offer)
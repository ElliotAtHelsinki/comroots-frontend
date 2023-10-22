import { Avatar, Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import NextLink from 'next/link'
import { EditDeleteSpaceButtons, Interpunct, Layout, NoUnderlineLink, OutlinedButton } from 'src/components'
import { useMySpaces } from 'src/hooks'
import { createURQLClient } from 'src/utils'

interface ManageSpacesProps {

}

const ManageSpaces: NextPage<ManageSpacesProps> = () => {
  const spaces = useMySpaces()
  return (
    <>
      <Head>
        <title>Manage Spaces | Comroots</title>
        <meta property='og:title' content='Manage Spaces | Comroots' key='title' />
        <meta name='description' content='Manage Spaces' />
      </Head>
      <Layout>
        <Box mb={6}>
          <NextLink passHref href='/create-space'>
            <OutlinedButton>Create Space</OutlinedButton>
          </NextLink>
        </Box>
        {
          !spaces ? 'Loading...' : spaces.length > 0 ?
            <Stack spacing={8} mb={8}>
              {
                spaces.map(s => (
                  <Flex key={s.id} align='center' pl={5} pr={5} pt={3} pb={3} shadow='md' borderWidth='1px' bgColor='white'>
                    <Avatar name={s.spaceName} src={s.avatarUrl} mr={4} />
                    <NextLink passHref href='/s/[space]' as={`/s/${s.spaceName}`}>
                      <NoUnderlineLink>
                        <Heading size='md'>
                          s/{s.spaceName}
                        </Heading>
                      </NoUnderlineLink>
                    </NextLink>
                    <Interpunct />
                    <Flex>
                      <Text color='gray.700'>{Number(s.subscriberNumber).toLocaleString()}</Text>
                      <Text color='gray.600'>&nbsp;subscribers</Text>
                    </Flex>
                    <Flex ml='auto' w='90px' justify='space-between'>
                      <EditDeleteSpaceButtons space={s} />
                    </Flex>
                  </Flex>
                ))
              }
            </Stack>
            : 'You don\'t manage any space.'
        }
      </Layout>
    </>
  )
}

export default withUrqlClient(createURQLClient)(ManageSpaces)
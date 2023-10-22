import { Avatar, Flex, Heading, Box, Stack, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import NextLink from 'next/link'
import { EditDeletePageButtons, Interpunct, Layout, NoUnderlineLink, OutlinedButton } from 'src/components'
import { useMyPages } from 'src/hooks'
import { createURQLClient } from 'src/utils'

interface ManagePagesProps {

}

const ManagePages: NextPage<ManagePagesProps> = () => {
  const pages = useMyPages()
  return (
    <>
      <Head>
        <title>Manage Pages | Comroots</title>
        <meta property='og:title' content='Manage Pages | Comroots' key='title' />
        <meta name='description' content='Manage Pages'/>
      </Head>
      <Layout>
        <Box mb={6}>
          <NextLink passHref href='/create-page'>
            <OutlinedButton>Create Page</OutlinedButton>
          </NextLink>
        </Box>
        {
          !pages ? 'Loading...' : pages.length > 0 ?
            <Stack spacing={8} mb={8}>
              {
                pages.map(p => (
                  <Flex key={p.id} align='center' pl={5} pr={5} pt={3} pb={3} shadow='md' borderWidth='1px' bgColor='white'>
                    <Avatar name={p.pageName} src={p.avatarUrl} mr={4} />
                    <NextLink passHref href='/p/[page]' as={`/p/${p.pageName}`}>
                      <NoUnderlineLink>
                        <Heading size='md'>
                          p/{p.pageName}
                        </Heading>
                      </NoUnderlineLink>
                    </NextLink>
                    <Interpunct />
                    <Flex>
                      <Text color='gray.700'>{Number(p.followerNumber).toLocaleString()}</Text>
                      <Text color='gray.600'>&nbsp;followers</Text>
                    </Flex>
                    <Flex ml='auto' w='90px' justify='space-between'>
                      <EditDeletePageButtons page={p} />
                    </Flex>
                  </Flex>
                ))
              }
            </Stack>
            : 'You have no pages'
        }
      </Layout>
    </>
  )
}

export default withUrqlClient(createURQLClient)(ManagePages)
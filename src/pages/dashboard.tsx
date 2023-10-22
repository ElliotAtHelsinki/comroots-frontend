import { Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { Layout } from 'src/components'
import { useEmbedUrlQuery } from 'src/generated/graphql'
import { createURQLClient } from 'src/utils'

interface DashboardProps {

}

const Dashboard: NextPage<DashboardProps> = () => {
  const [{ data }] = useEmbedUrlQuery()
  return (
    <>
      <Head>
        <title>Dashboard | Comroots</title>
        <meta property='og:title' content='Dashboard | Comroots' key='title' />
        <meta name='description' content='Dashboard'/>
      </Head>
      <Layout variant='full' navBarShadow={false}>
        <Box w='full' h='full' mt='-30px'>
          {
            data ?
              <iframe
                width='100%'
                height='100%'
                src={data?.embedUrl}
                style={{
                  maxHeight: 'calc(100vh - 50px)',
                  position: 'fixed',
                }}
              />
              :
              'Loading...'
          }
        </Box>
      </Layout >
    </>
  )
}

export default withUrqlClient(createURQLClient)(Dashboard)
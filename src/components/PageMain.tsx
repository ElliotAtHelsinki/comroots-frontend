import { Box, Heading } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { PageQuery } from 'src/generated/graphql'
import { EditPageAboutButton } from './EditPageAboutButton'
const QuillDisplay = dynamic(() => import('src/components/QuillDisplay.client'), { ssr: false })

interface PageMainProps {
  data: PageQuery
}

export const PageMain = (props: PageMainProps): JSX.Element => {
  const { data } = props
  const pageId = useMemo(() => data?.page?.id, [data])

  return (
    <>
      <Box w='full' position='relative' bgColor='white' shadow='lg' mb='4' mt={10} p='10'>
        <Heading size='lg' mb={4}>About</Heading>
        {
          data?.page?.ownerStatus &&
          <EditPageAboutButton data={data} />
        }
        <QuillDisplay value={data?.page?.about} />
      </Box>
    </>
  )
}
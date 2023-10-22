
import { Box, Heading } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { SpaceQuery } from 'src/generated/graphql'
import { EditSpaceAboutButton } from './EditSpaceAboutButton'
import { EditSpaceRulesButton } from './EditSpaceRulesButton'
const QuillDisplay = dynamic(() => import('src/components/QuillDisplay.client'), { ssr: false })

interface SpaceMainProps {
  data: SpaceQuery
}

export const SpaceMain = (props: SpaceMainProps): JSX.Element => {
  const { data } = props

  return (
    <>
      <Box w='full' position='relative' bgColor='white' shadow='lg' mb='4' mt={10} p='10'>
        <Heading size='lg' mb={4}>Rules</Heading>
        {
          data?.space?.modStatus &&
          <EditSpaceRulesButton data={data} />
        }
        <QuillDisplay value={data?.space?.rules} />
      </Box>
      <Box w='full' position='relative' bgColor='white' shadow='lg' mb='4' mt={10} p='10'>
        <Heading size='lg' mb={4}>About</Heading>
        {
          data?.space?.modStatus &&
          <EditSpaceAboutButton data={data} />
        }
        <QuillDisplay value={data?.space?.about} />
      </Box>
    </>
  )
}
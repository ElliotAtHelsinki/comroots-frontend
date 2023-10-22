import { Button, Grid, GridItem } from '@chakra-ui/react'
import capitalize from 'lodash/capitalize'
import { useState } from 'react'

interface TabButtonsProps {
  tabs: string[]
  defaultTab: string
  setActive: Function
}

export const TabButtons = (props: TabButtonsProps): JSX.Element => {
  const { tabs, defaultTab, setActive } = props
  const [activeTab, setActiveTab] = useState(defaultTab)
  return (
    <Grid gridTemplateColumns={`repeat(${tabs.length}, 6.5rem)`}  columnGap='2rem' position='sticky' top='0'>
      {
        tabs.length > 0 &&
        tabs.map((tab, index) =>
          <GridItem key={index}>
            <Button
              onClick={() => {
                setActiveTab(tab)
                setActive(tab)
              }}
              w='full'
              minW='6.5rem'
              bgColor={activeTab == tab ? 'white' : 'transparent'}
              textColor={activeTab == tab ? 'blackAlpha.600' : 'green.400'}
              fontWeight='semibold'
            >
              {capitalize(tab)}
            </Button>
          </GridItem>
        )
      }
    </Grid>
  )
}
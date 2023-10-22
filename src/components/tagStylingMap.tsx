import { QuestionOutlineIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import { SelectOption } from 'src/types'

export const tagStylingMap: Record<string, Omit<SelectOption, 'label' | 'value'>> = {
  Question: {
    colorScheme: 'blackAlpha',
    icon: <QuestionOutlineIcon />
  },
  Help: {
    colorScheme: 'messenger',
    icon: <Box className='fa-solid fa-comment' />
  },
  Fundraising: {
    colorScheme: 'green',
    icon: <Box className='fa-solid fa-dollar-sign' />
  },
  Introduction: {
    colorScheme: 'red',
    icon: <Box className='fa-solid fa-info' />
  },
  Self: {
    colorScheme: 'telegram',
    icon: <Box className='fa-solid fa-address-card' />
  },
  AMA: {
    colorScheme: 'orange',
    icon: <Box className='fa-solid fa-comments-question' />
  },
  Resources: {
    colorScheme: 'teal',
    icon: <Box className='fa-solid fa-books' />
  },
  Educational: {
    colorScheme: 'purple',
    icon: <Box className='fa-solid fa-building-columns' />
  },
  Poll: {
    colorScheme: 'pink',
    icon: <Box className='fa-solid fa-box-ballot' />
  },
  Recruitment: {
    colorScheme: 'green',
    icon: <Box className='fa-solid fa-bullseye-arrow' />
  },
  Contract: {
    colorScheme: 'yellow',
    icon: <Box className='fa-solid fa-handshake-simple' />
  },
  Networking: {
    colorScheme: 'facebook',
    icon: <Box className='fa-solid fa-chart-network' />
  },
  Opinion: {
    colorScheme: 'twitter',
    icon: <Box className='fa-solid fa-message-lines' />
  },
  Other: {
    colorScheme: 'gray'
  },
}
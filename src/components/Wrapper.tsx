import { Box } from '@chakra-ui/react'

export type WrapperVariant = 'small' | 'regular' | 'large' | 'full'

interface WrapperProps {
  children?: React.ReactNode
  variant?: WrapperVariant
}

const variantToWidth = (variant: WrapperVariant): string => {
  switch (variant) {
    case 'small':
      return '400px'
    case 'regular':
      return '800px'
    case 'large':
      return '1200px'
    case 'full':
      return '100vw'
  }
}

export const Wrapper = (props: WrapperProps): JSX.Element => {
  const { children, variant = 'regular' } = props
  return (
    <Box mt='50px' pt={8} mb={8} maxW={variantToWidth(variant)} w='100%' mx='auto'>
      {children}
    </Box>
  )
}
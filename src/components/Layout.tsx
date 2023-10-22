import { Box } from '@chakra-ui/react'
import { NavBar } from './NavBar'
import { Wrapper, WrapperVariant } from './Wrapper'

interface LayoutProps {
  children?: React.ReactNode
  variant?: WrapperVariant
  navBarShadow?: boolean
}

export const Layout = (props: LayoutProps): JSX.Element => {
  const { children, variant, navBarShadow } = props
  return (
    <Box bgColor='#F3F2EF' minH='100vh' w='100vw' overflowX='hidden'>
      <NavBar shadow={navBarShadow} />
      <Wrapper variant={variant}>
        {children}
      </Wrapper>
    </Box>
  )
}
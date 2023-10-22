import { ButtonProps, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { Logo } from './Logo'

export const LogoButton = (props: ButtonProps): JSX.Element => {
  const [logoDensity, setLogoDensity] = useState(500)
  return (
    <IconButton
      aria-label='app-icon'
      icon={<Logo density={logoDensity} w='full' h='full' />}
      bgColor='transparent'
      _hover={{ bgColor: 'transparent' }}
      _active={{ bgColor: 'transparent' }}
      onMouseOver={() => setLogoDensity(600)}
      onMouseLeave={() => setLogoDensity(500)}
      onMouseDown={() => setLogoDensity(700)}
      onMouseUp={() => setLogoDensity(500)}
      w='35px !important'
      h='35px !important'
      minW='0px'
      minH='0px'
      {...props}
    />
  )
}
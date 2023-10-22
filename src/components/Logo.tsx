import { Image } from '@chakra-ui/react'
import { ImageProps } from '@chakra-ui/react'

type LogoProps = ImageProps & {
  density?: string | number
}

export const Logo = (props: LogoProps): JSX.Element => {
  const { density = 500 } = props
  return (
    <Image src={`/logos/logo.${density}.webp`} alt='Logo' sizes='fixed' {...props} />
  )
}
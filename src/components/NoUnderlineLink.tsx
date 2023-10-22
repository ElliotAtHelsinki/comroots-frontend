import { Link, LinkProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

type NoUnderlineLinkProps = LinkProps & {
  children?: ReactNode
}

export const NoUnderlineLink = (props: NoUnderlineLinkProps) => {
  const { children, ...rest } = props
  return (
    <Link
      textDecoration='none'
      _hover={{ textDecoration: 'none' }}
      _active={{ textDecoration: 'none' }}
      _visited={{ textDecoration: 'none' }}
      {...rest}
    >
      {children}
    </Link>
  )
}
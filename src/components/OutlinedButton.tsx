import { Button, ButtonProps, ColorProps } from '@chakra-ui/react'
import { DataType } from 'csstype'

type OutlinedButtonProps = ButtonProps & {
  color?: DataType.NamedColor
  baseColorLevel?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
}

export const OutlinedButton = (props: OutlinedButtonProps): JSX.Element => {
  const { color = 'green', children, baseColorLevel = 500 } = props
  return (
    <Button
      {...props}
      bgColor='white'
      borderWidth='3px'
      borderColor={`${color}.${baseColorLevel}`}
      textColor={`${color}.${baseColorLevel}`}
      _hover={{ bgColor: `${color}.50` }}
      _active={{ bgColor: `${color}.100` }}
      _focusVisible={{ boxShadow: 'none' }}
    >
      {children}
    </Button>
  )
}
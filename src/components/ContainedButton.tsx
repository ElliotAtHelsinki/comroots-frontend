import { Button, ButtonProps } from '@chakra-ui/react'
import { DataType } from 'csstype'

type ContainedButtonProps = ButtonProps & {
  color?: DataType.NamedColor
  baseColorLevel?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
}

export const ContainedButton = (props: ContainedButtonProps): JSX.Element => {
  const { color = 'green', children, baseColorLevel = 400 } = props
  return (
    <Button
      {...props}
      bgColor={`${color}.${baseColorLevel}`}
      textColor='white'
      _hover={{ bgColor: `${color}.${parseInt(baseColorLevel as string) - 100}` }}
      _active={{ bgColor: `${color}.${parseInt(baseColorLevel as string) + 100}` }}
      _focusVisible={{ boxShadow: 'none' }}
    >
      {children}
    </Button>
  )
}
import { ThemingProps, Icon, Text } from '@chakra-ui/react'
import { PropsOf } from '@chakra-ui/react'

export interface SelectOption {
  label: any
  value: string | number
  colorScheme?: ThemingProps['colorScheme']
  icon?: ReturnType<typeof Icon>
  textColor?: PropsOf<typeof Text>['color']
}
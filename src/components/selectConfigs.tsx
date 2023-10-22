import { Box, Tag, Flex, TagLeftIcon, TagLabel } from '@chakra-ui/react'
import { chakraComponents, Select, OptionProps, GroupBase, MultiValueGenericProps } from 'chakra-react-select'
import { SelectOption } from 'src/types'
const { Option, MultiValueContainer } = chakraComponents

export const tagSelectCustomComponents = {
  Option: ({
    children,
    ...props
  }: OptionProps<SelectOption, boolean, GroupBase<SelectOption>>) => (
    <Option {...props}>
      <Tag colorScheme={props.data.colorScheme ? props.data.colorScheme : undefined}>
        <Flex align='center'>
          {
            props.data.icon &&
            <Flex w='20px' justify='center' align='center' mr={1}>
              <TagLeftIcon as={() => props.data.icon} />
            </Flex>
          }
          <TagLabel color={props.data.textColor ? props.data.textColor : undefined}>{children}</TagLabel>
        </Flex>
      </Tag>
    </Option>
  ),
  MultiValueContainer: ({
    children,
    ...props
  }: MultiValueGenericProps<SelectOption, boolean, GroupBase<SelectOption>>) => (
    <MultiValueContainer {...props}>
      {
        props.data.icon &&
        <Box mr={2}>
          <TagLeftIcon as={() => props.data.icon} />
        </Box>
      }
      {children}
    </MultiValueContainer>
  )
}
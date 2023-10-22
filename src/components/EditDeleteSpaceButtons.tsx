import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Space, useDeleteSpaceMutation } from 'src/generated/graphql'
import { NoUnderlineLink } from './NoUnderlineLink'

interface EditDeleteSpaceButtonsProps {
  space: Partial<Space>
}

export const EditDeleteSpaceButtons = (props: EditDeleteSpaceButtonsProps): JSX.Element => {
  const { space } = props
  const [, deleteSpace] = useDeleteSpaceMutation()
  
  return (
    <>
      <NextLink passHref href='/s/edit/[space]' as={`/s/edit/${space.spaceName}`}>
        <IconButton
          color='brown'
          bg='transparent'
          icon={<EditIcon />}
          aria-label='edit'
          as={NoUnderlineLink}
        />
      </NextLink>
      <IconButton
        color='red.500'
        bg='transparent'
        icon={<DeleteIcon />}
        aria-label='delete'
        onClick={async () => {
          await deleteSpace({ id: space.id })
        }}
      />
    </>
  )
}
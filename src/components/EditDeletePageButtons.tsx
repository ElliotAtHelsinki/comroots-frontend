import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Page, useDeletePageMutation } from 'src/generated/graphql'
import { NoUnderlineLink } from './NoUnderlineLink'

interface EditDeletePageButtonsProps {
  page: Partial<Page>
}

export const EditDeletePageButtons = (props: EditDeletePageButtonsProps): JSX.Element => {
  const { page } = props
  const [, deletePage] = useDeletePageMutation()
  
  return (
    <>
      <NextLink passHref href='/p/edit/[page]' as={`/p/edit/${page.pageName}`}>
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
          await deletePage({ id: page.id })
        }}
      />
    </>
  )
}
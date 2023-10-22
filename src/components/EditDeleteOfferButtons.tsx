import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useDeleteOfferMutation } from 'src/generated/graphql'
import { NoUnderlineLink } from './NoUnderlineLink'

interface EditDeleteOfferButtonsProps {
  id: number
}

export const EditDeleteOfferButtons = (props: EditDeleteOfferButtonsProps): JSX.Element => {
  const { id } = props
  const [, deleteOffer] = useDeleteOfferMutation()
  return (
    <>
      <NextLink passHref href='/offer/edit/[id]' as={`/offer/edit/${id}`}>
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
          await deleteOffer({ id })
        }}
      />
    </>
  )
}
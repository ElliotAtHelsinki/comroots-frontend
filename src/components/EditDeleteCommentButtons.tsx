
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { Comment, useDeleteCommentMutation, useUpdateCommentMutation } from 'src/generated/graphql'
import { ContainedButton } from './ContainedButton'
import { InputField } from './InputField'

interface EditDeleteCommentButtonsProps {
  comment: Partial<Comment>
}

export const EditDeleteCommentButtons = (props: EditDeleteCommentButtonsProps): JSX.Element => {
  const { comment } = props
  const [, deleteComment] = useDeleteCommentMutation()
  const [, updateComment] = useUpdateCommentMutation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton
        color='brown'
        bg='transparent'
        icon={<EditIcon />}
        aria-label='edit'
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <Formik
          initialValues={{ id: comment.id, text: comment.text }}
          onSubmit={async values => {
            await updateComment(values)
            onClose()
          }}
        >
          {({ isSubmitting }) =>
            <Form onChange={() => { }}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Comment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <InputField name='text' placeholder='comment...' label='' inputType='textarea' />
                </ModalBody>
                <ModalFooter>
                  <Flex w='full' justify='center'>
                    <ContainedButton baseColorLevel={500} type='submit' isLoading={isSubmitting} >
                      Save
                    </ContainedButton>
                  </Flex>
                </ModalFooter>
              </ModalContent>
            </Form>
          }
        </Formik>
      </Modal>
      <IconButton
        color='red.500'
        bg='transparent'
        icon={<DeleteIcon />}
        aria-label='delete'
        onClick={async () => {
          await deleteComment({ id: comment.id })
        }}
      />
    </>
  )
}
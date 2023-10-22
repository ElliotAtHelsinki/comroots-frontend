import { PlusSquareIcon } from '@chakra-ui/icons'
import { Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { Dispatch, useEffect, useState } from 'react'
import { useCreateConversationMutation } from 'src/generated/graphql'
import { toErrorMap } from 'src/utils'
import { FormSuccessMessage } from './FormSuccessMessage'
import { InputField } from './InputField'

interface CreateConversationButtonProps {
  setConversationId: Dispatch<string>
}

export const CreateConversationButton = (props: CreateConversationButtonProps): JSX.Element => {
  const { setConversationId } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [, createConversation] = useCreateConversationMutation()

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 500)
    }
  }, [showSuccessMessage])

  return (
    <>

      <IconButton onClick={onOpen} aria-label='create-conversation' bgColor='transparent' _focusVisible={{ boxShadow: '0 0 0 3px #68D391;' }} icon={<PlusSquareIcon color='green' fontSize='lg' />} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={{ partnerUsername: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createConversation(values)
            if (response.data?.createConversation.errors) {
              setErrors(toErrorMap(response.data.createConversation.errors))
            }
            else {
              setShowSuccessMessage(true)
              setTimeout(() => {
                onClose()
                setConversationId(response.data.createConversation.conversation.id)
              }, 550)
            }
          }}
        >
          {({ isSubmitting }) =>
            <Form>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create new conversation</ModalHeader>
                <ModalCloseButton _focusVisible={{ boxShadow: '0 0 0 3px #68D391;' }} />
                <ModalBody>
                  <InputField name='partnerUsername' placeholder='username' label='With:' />
                  {
                    showSuccessMessage &&
                    <FormSuccessMessage message='Conversation created successfully.' />
                  }
                </ModalBody>
                <ModalFooter>
                  <Flex justify='center' align='center' w='full'>
                    <Button colorScheme='green' type='submit' isLoading={isSubmitting}>
                      Create
                    </Button>
                  </Flex>
                </ModalFooter>
              </ModalContent>
            </Form>
          }
        </Formik>
      </Modal>
    </>
  )
}
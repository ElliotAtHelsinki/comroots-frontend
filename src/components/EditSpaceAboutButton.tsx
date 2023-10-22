import { Box, Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { SpaceQuery, useUpdateSpaceInfoMutation } from 'src/generated/graphql'
import { ContainedButton } from './ContainedButton'
import { InputField } from './InputField'

interface EditSpaceAboutButtonProps {
  data: SpaceQuery
}

export const EditSpaceAboutButton = (props: EditSpaceAboutButtonProps): JSX.Element => {
  const { data } = props
  const [, updateInfo] = useUpdateSpaceInfoMutation()
  const { isOpen: isEditingAboutOpen, onOpen: onEditingAboutOpen, onClose: onEditingAboutClose } = useDisclosure()

  return (
    <>
      <Button variant='ghost' w='40px' h='40px' position='absolute' top='10' right='10' onClick={onEditingAboutOpen} >
        <Icon as={() => <Box className='fa-regular fa-pen' />} />
      </Button>
      <Modal isOpen={isEditingAboutOpen} onClose={onEditingAboutClose} size='2xl'>
        <Formik
          initialValues={{ about: data?.space?.about }}
          onSubmit={async values => {
            await updateInfo({ id: data?.space?.id, input: values })
            onEditingAboutClose()
          }}
        >
          {({ isSubmitting }) =>
            <Form>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Update about</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <InputField name='about' placeholder='A full introduction about your space' label='' inputType='quill' />
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
    </>
  )
}
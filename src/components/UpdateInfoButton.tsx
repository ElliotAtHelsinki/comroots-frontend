import { Box, Button, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, useDisclosure } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { UserQuery, useUpdateInfoMutation } from 'src/generated/graphql'
import { ContainedButton } from './ContainedButton'
import { InputField } from './InputField'

interface UpdateInfoButtonProps {
  data: UserQuery
}

export const UpdateInfoButton = (props: UpdateInfoButtonProps): JSX.Element => {
  const { data } = props
  const [, updateInfo] = useUpdateInfoMutation()
  const { isOpen: isEditingInfoOpen, onOpen: onEditingInfoOpen, onClose: onEditingInfoClose } = useDisclosure()
  return (
    <>
      <Button variant='ghost' w='40px' h='40px' position='absolute' top={6} right='3rem' onClick={onEditingInfoOpen}>
        <Icon as={() => <Box className='fa-regular fa-pen' />} />
      </Button>
      <Modal isOpen={isEditingInfoOpen} onClose={onEditingInfoClose} size='2xl'>
        <Formik
          initialValues={{ fullName: data?.user?.fullName, headline: data?.user?.headline, address: data?.user?.address }}
          onSubmit={async values => {
            await updateInfo({ input: values })
            onEditingInfoClose()
          }}
        >
          {({ isSubmitting }) =>
            <Form>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Update info</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <InputField name='fullName' placeholder='e.g. John Doe' label='Full Name' />
                  <Box mt={4}>
                    <InputField name='headline' placeholder='a short sentence about yourself' label='Headline' />
                  </Box>
                  <Box mt={4}>
                    <InputField name='address' label='Address' />
                  </Box>
                  {/* <Box mt={4}>
                    <InputField name='about' placeholder='A full introduction about yourself' label='About' inputType='quill' />
                  </Box> */}
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
import { Box, Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useUploadCvMutation } from 'src/generated/graphql'
import { ContainedButton } from './ContainedButton'
import { FileField } from './FileField'

interface UploadCVButtonProps {

}

export const UploadCVButton = (props: UploadCVButtonProps): JSX.Element => {
  const { } = props
  const { isOpen: isUploadingCVOpen, onOpen: onUploadingCVOpen, onClose: onUploadingCVClose } = useDisclosure()
  const [, uploadCV] = useUploadCvMutation()

  return (
    <>
      <Button onClick={onUploadingCVOpen} variant='ghost' w='40px' h='40px' position='absolute' top={10} right='3rem' >
        <Icon as={() => <Box className='fa-solid fa-plus' fontSize='1rem' />} />
      </Button>
      <Modal isOpen={isUploadingCVOpen} onClose={onUploadingCVClose} size='2xl'>
        <Formik
          initialValues={{ upload: null }}
          onSubmit={async (values) => {
            uploadCV(values)
            onUploadingCVClose()
          }}
        >
          {({ isSubmitting, values }) =>
            <Form>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Upload new CV</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FileField label='' name='upload' values={values} />
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
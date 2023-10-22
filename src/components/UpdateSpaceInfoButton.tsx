import { Box, Button, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, useDisclosure } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { SpaceQuery, useUpdateSpaceInfoMutation } from 'src/generated/graphql'
import { ContainedButton } from './ContainedButton'
import { InputField } from './InputField'

interface UpdateSpaceInfoButtonProps {
  data: SpaceQuery
}

export const UpdateSpaceInfoButton = (props: UpdateSpaceInfoButtonProps): JSX.Element => {
  const { data } = props
  const [, updateInfo] = useUpdateSpaceInfoMutation()
  const { isOpen: isEditingInfoOpen, onOpen: onEditingInfoOpen, onClose: onEditingInfoClose } = useDisclosure()
  return (
    <>
      <Button variant='ghost' w='40px' h='40px' position='absolute' top={6} right='3rem' onClick={onEditingInfoOpen}>
        <Icon as={() => <Box className='fa-regular fa-pen' />} />
      </Button>
      <Modal isOpen={isEditingInfoOpen} onClose={onEditingInfoClose} size='2xl'>
        <Formik
          initialValues={{ fullSpaceName: data?.space?.fullSpaceName, headline: data?.space?.headline  }}
          onSubmit={async values => {
            await updateInfo({ id: data?.space?.id, input: values })
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
                  <InputField name='fullSpaceName' placeholder='full name of your space' label='Full Name' />
                  <Box mt={4}>
                    <InputField name='headline' placeholder='a short sentence about your space' label='Headline' />
                  </Box>
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
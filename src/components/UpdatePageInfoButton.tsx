import { Box, Button, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, useDisclosure } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { PageQuery, useUpdatePageInfoMutation } from 'src/generated/graphql'
import { ContainedButton } from './ContainedButton'
import { InputField } from './InputField'

interface UpdatePageInfoButtonProps {
  data: PageQuery
}

export const UpdatePageInfoButton = (props: UpdatePageInfoButtonProps): JSX.Element => {
  const { data } = props
  const [, updateInfo] = useUpdatePageInfoMutation()
  const { isOpen: isEditingInfoOpen, onOpen: onEditingInfoOpen, onClose: onEditingInfoClose } = useDisclosure()
  return (
    <>
      <Button variant='ghost' w='40px' h='40px' position='absolute' top={6} right='3rem' onClick={onEditingInfoOpen}>
        <Icon as={() => <Box className='fa-regular fa-pen' />} />
      </Button>
      <Modal isOpen={isEditingInfoOpen} onClose={onEditingInfoClose} size='2xl'>
        <Formik
          initialValues={{ fullPageName: data?.page?.fullPageName, headline: data?.page?.headline, address: data?.page?.address  }}
          onSubmit={async values => {
            await updateInfo({ id: data?.page?.id, input: values })
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
                  <InputField name='fullPageName' placeholder='full name of your page' label='Full Name' />
                  <Box mt={4}>
                    <InputField name='headline' placeholder='a short sentence about your page' label='Headline' />
                  </Box>
                  <Box mt={4}>
                    <InputField name='address' label='Address' />
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
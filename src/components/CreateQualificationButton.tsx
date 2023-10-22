import { Box, Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { QualificationInput, useCreateQualificationMutation } from 'src/generated/graphql'
import { toErrorMap } from 'src/utils'
import { ContainedButton } from './ContainedButton'
import { DatePickerField } from './DatePickerField'
import { InputField } from './InputField'
import { PhotoField } from './PhotoField'
import { SwitchField } from './SwitchField'

interface CreateQualificationButtonProps {

}

export const CreateQualificationButton = (props: CreateQualificationButtonProps): JSX.Element => {
  const { } = props
  const [, createQualification] = useCreateQualificationMutation()
  const { isOpen: isAddingQualificationOpen, onOpen: onAddingQualificationOpen, onClose: onAddingQualificationClose } = useDisclosure()

  return (
    <>
      <Button onClick={onAddingQualificationOpen} variant='ghost' w='40px' h='40px' position='absolute' top={10} right='3rem' >
        <Icon as={() => <Box className='fa-solid fa-plus' fontSize='1.25rem' />} />
      </Button>
      <Modal isOpen={isAddingQualificationOpen} onClose={onAddingQualificationClose} size='2xl'>
        <Formik
          initialValues={{ name: '', issuingOrganisation: '', issuanceDate: null, expire: false, expirationDate: null, credentialID: '', credentialURL: '',  photo: null } as QualificationInput}
          onSubmit={async (values, { setErrors }) => {
            const response = await createQualification({ input: values })
            if (response.data?.createQualification?.errors) {
              setErrors(toErrorMap(response.data.createQualification.errors))
            }
            else {
              onAddingQualificationClose()
            }
          }}
        >
          {({ isSubmitting }) =>
            <Form>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{'Add license or certification'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <InputField name='name' placeholder='' label='Name' />
                  <Box mt={4}>
                    <InputField name='issuingOrganisation' placeholder='' label='Issuing Organisation' />
                  </Box>
                  <Box mt={4}>
                    <DatePickerField label='Issuance Date' name='issuanceDate' />
                  </Box>
                  <Box mt={4}>
                    <SwitchField label='Expire' name='expire' />
                  </Box>
                  <Box mt={4}>
                    <DatePickerField label='Expiration Date' name='expirationDate' />
                  </Box>
                  <Box mt={4}>
                    <InputField name='credentialID' placeholder='' label='Credential ID' />
                  </Box>
                  <Box mt={4}>
                    <InputField name='credentialURL' placeholder='' label='Credential URL' />
                  </Box>
                  <Box mt={4}>
                    <PhotoField label='Photo' name='photo' type='square' />
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
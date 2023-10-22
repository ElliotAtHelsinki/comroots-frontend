import { Box, Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useCreateEducationItemMutation } from 'src/generated/graphql'
import { toErrorMap } from 'src/utils'
import { ContainedButton } from './ContainedButton'
import { DatePickerField } from './DatePickerField'
import { InputField } from './InputField'
import { PhotoField } from './PhotoField'

interface CreateEducationItemButtonProps {

}

export const CreateEducationItemButton = (props: CreateEducationItemButtonProps): JSX.Element => {
  const { } = props
  const [, createEducationItem] = useCreateEducationItemMutation()
  const { isOpen: isAddingEducationItemOpen, onOpen: onAddingEducationItemOpen, onClose: onAddingEducationItemClose } = useDisclosure()

  return (
    <>
      <Button onClick={onAddingEducationItemOpen} variant='ghost' w='40px' h='40px' position='absolute' top={10} right='3rem' >
        <Icon as={() => <Box className='fa-solid fa-plus' fontSize='1.25rem' />} />
      </Button>
      <Modal isOpen={isAddingEducationItemOpen} onClose={onAddingEducationItemClose} size='2xl'>
        <Formik
          initialValues={{ school: '', status: '', startDate: null, endDate: null, photo: null }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createEducationItem({ input: values })
            if (response.data?.createEducationItem?.errors) {
              setErrors(toErrorMap(response.data.createEducationItem.errors))
            }
            else {
              onAddingEducationItemClose()
            }
          }}
        >
          {({ isSubmitting }) =>
            <Form>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add education</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <InputField name='school' placeholder='' label='School' />
                  <Box mt={4}>
                    <InputField name='status' placeholder='e.g. Graduated, dropped out, etc.' label='Status' />
                  </Box>
                  <Box mt={4}>
                    <DatePickerField label='Start Date' name='startDate' />
                  </Box>
                  <Box mt={4}>
                    <DatePickerField label='End Date' name='endDate' />
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
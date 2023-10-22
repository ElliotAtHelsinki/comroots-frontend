import { Box, Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useCreateExperienceMutation } from 'src/generated/graphql'
import { toErrorMap } from 'src/utils'
import { ContainedButton } from './ContainedButton'
import { DatePickerField } from './DatePickerField'
import { InputField } from './InputField'
import { PhotoField } from './PhotoField'

interface CreateExperienceButtonProps {

}

export const CreateExperienceButton = (props: CreateExperienceButtonProps): JSX.Element => {
  const { } = props
  const [, createExperience] = useCreateExperienceMutation()
  const { isOpen: isAddingExperienceOpen, onOpen: onAddingExperienceOpen, onClose: onAddingExperienceClose } = useDisclosure()

  return (
    <>
      <Button onClick={onAddingExperienceOpen} variant='ghost' w='40px' h='40px' position='absolute' top={10} right='3rem' >
        <Icon as={() => <Box className='fa-solid fa-plus' fontSize='1.25rem' />} />
      </Button>
      <Modal isOpen={isAddingExperienceOpen} onClose={onAddingExperienceClose} size='2xl'>
        <Formik
          initialValues={{ title: '', workplace: '', startDate: null, endDate: null, photo: null }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createExperience({ input: values })
            if (response.data?.createExperience?.errors) {
              setErrors(toErrorMap(response.data.createExperience.errors))
            }
            else {
              onAddingExperienceClose()
            }
          }}
        >
          {({ isSubmitting }) =>
            <Form>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add experience</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <InputField name='title' placeholder='e.g. Intern, CEO, etc.' label='Title' />
                  <Box mt={4}>
                    <InputField name='workplace' placeholder='' label='Workplace' />
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
import { Box, Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { SpaceQuery, useUpdateSpaceInfoMutation } from 'src/generated/graphql'
import { ContainedButton } from './ContainedButton'
import { InputField } from './InputField'

interface EditSpaceRulesButtonProps {
  data: SpaceQuery
}

export const EditSpaceRulesButton = (props: EditSpaceRulesButtonProps): JSX.Element => {
  const { data } = props
  const [, updateInfo] = useUpdateSpaceInfoMutation()
  const { isOpen: isEditingRulesOpen, onOpen: onEditingRulesOpen, onClose: onEditingRulesClose } = useDisclosure()

  return (
    <>
      <Button variant='ghost' w='40px' h='40px' position='absolute' top='10' right='10' onClick={onEditingRulesOpen} >
        <Icon as={() => <Box className='fa-regular fa-pen' />} />
      </Button>
      <Modal isOpen={isEditingRulesOpen} onClose={onEditingRulesClose} size='2xl'>
        <Formik
          initialValues={{ rules: data?.space?.rules }}
          onSubmit={async values => {
            await updateInfo({ id: data?.space?.id, input: values })
            onEditingRulesClose()
          }}
        >
          {({ isSubmitting }) =>
            <Form>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Update rules</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <InputField name='rules' placeholder='Some rules for posting at your space' label='' inputType='quill' />
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
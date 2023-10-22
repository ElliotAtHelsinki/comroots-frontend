import { Button, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, useDisclosure, Box } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { UserQuery, useSetSkillsMutation } from 'src/generated/graphql'
import { ContainedButton } from './ContainedButton'
import { CreatableSelectField } from './CreatableSelectField'

interface SetSkillsButtonProps {
  data: UserQuery
}

export const SetSkillsButton = (props: SetSkillsButtonProps): JSX.Element => {
  const { data } = props
  const { isOpen: isEditingSkillsOpen, onOpen: onEditingSkillsOpen, onClose: onEditingSkillsClose } = useDisclosure()
  const [, setSkills] = useSetSkillsMutation()

  return (
    <>
      <Button onClick={onEditingSkillsOpen} variant='ghost' w='40px' h='40px' position='absolute' top={10} right='3rem' >
        <Icon as={() => <Box className='fa-regular fa-pen' fontSize='1rem' />} />
      </Button>
      <Modal isOpen={isEditingSkillsOpen} onClose={onEditingSkillsClose} size='2xl'>
        <Formik
          initialValues={{ skills: data?.user?.skills }}
          onSubmit={async (values) => {
            setSkills(values)
            onEditingSkillsClose()
          }}
        >
          {({ isSubmitting }) =>
            <Form>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Set skills</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <CreatableSelectField
                    label=''
                    name='skills'
                    defaultValue={data?.user?.skills?.length > 0 ? data.user.skills.map(skill => ({ value: skill, label: skill })) : []}
                  />
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
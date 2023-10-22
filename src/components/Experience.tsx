import { Box, Button, Flex, GridItem, Heading, Icon, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { DateTime } from 'luxon'
import { ExperiencesQuery, MeQuery, useDeleteExperienceMutation, useUpdateExperienceMutation, useUserQuery } from 'src/generated/graphql'
import { ContainedButton } from './ContainedButton'
import { DatePickerField } from './DatePickerField'
import { InputField } from './InputField'
import { Interpunct } from './Interpunct'
import { PhotoField } from './PhotoField'

interface ExperienceProps {
  data: ReturnType<typeof useUserQuery>[0]['data']
  me: MeQuery['me']
  item: ExperiencesQuery['experiences'][0]
}

export const Experience = (props: ExperienceProps): JSX.Element => {
  const { data, me, item } = props
  const { isOpen: isEditingExperienceOpen, onOpen: onEditingExperienceOpen, onClose: onEditingExperienceClose } = useDisclosure()
  const [, updateExperience] = useUpdateExperienceMutation()
  const [, deleteExperience] = useDeleteExperienceMutation()

  return (
    <GridItem key={item.id}>
      <Flex align='center' minH='62px'>
        <Image src={item.photoUrl} alt='experience-photo' fallbackSrc='/samples/square.webp' w='45px' h='45px' mr={4} />
        <Box>
          <Heading size='sm'>{item.title}</Heading>
          <Text color='gray.600' fontSize='sm'>{item?.workplace}</Text>
          <Flex color='gray.600' fontSize='smaller'>
            {
              item.startDate &&
              DateTime.fromISO(item.startDate).setLocale('fr').toLocaleString(DateTime.DATE_SHORT)
            }
            {
              item.startDate && item.endDate &&
              <Interpunct />
            }
            {
              item.endDate &&
              DateTime.fromISO(item.endDate).setLocale('fr').toLocaleString(DateTime.DATE_SHORT)
            }
          </Flex>
        </Box>
        {
          data?.user?.id == me?.id &&
          <Box ml='auto'>
            <Button variant='ghost' w='40px' h='40px' mr={2} onClick={onEditingExperienceOpen} >
              <Icon as={() => <Box className='fa-regular fa-pen' />} />
            </Button>
            <Modal isOpen={isEditingExperienceOpen} onClose={onEditingExperienceClose} size='2xl'>
              <Formik
                initialValues={{ title: item.title, workplace: item.workplace, startDate: item.startDate, endDate: item.endDate, photo: null }}
                onSubmit={async values => {
                  await updateExperience({ id: item.id, input: values })
                  onEditingExperienceClose()
                }}
              >
                {({ isSubmitting }) =>
                  <Form>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Update experience</ModalHeader>
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
            <Button variant='ghost' w='40px' h='40px' mr={2} onClick={async () => { await deleteExperience({ id: item.id }) }}>
              <Icon as={() => <Box className='fa-regular fa-trash' />} />
            </Button>
          </Box>
        }
      </Flex>
    </GridItem>
  )
}
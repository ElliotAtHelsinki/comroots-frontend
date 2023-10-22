import { Box, Button, Flex, GridItem, Heading, Icon, Image, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { DateTime } from 'luxon'
import { MeQuery, QualificationsQuery, useDeleteQualificationMutation, useUpdateQualificationMutation, useUserQuery } from 'src/generated/graphql'
import { ContainedButton } from './ContainedButton'
import { DatePickerField } from './DatePickerField'
import { InputField } from './InputField'
import { Interpunct } from './Interpunct'
import { PhotoField } from './PhotoField'
import { SwitchField } from './SwitchField'

interface QualificationProps {
  data: ReturnType<typeof useUserQuery>[0]['data']
  me: MeQuery['me']
  item: QualificationsQuery['qualifications'][0]
}

export const Qualification = (props: QualificationProps): JSX.Element => {
  const { data, me, item } = props
  const { isOpen: isEditingQualificationOpen, onOpen: onEditingQualificationOpen, onClose: onEditingQualificationClose } = useDisclosure()
  const [, updateQualification] = useUpdateQualificationMutation()
  const [, deleteQualification] = useDeleteQualificationMutation()
  
  return (
    <GridItem key={item.id}>
      <Flex align='center' minH='62px'>
        <Image src={item.photoUrl} alt='qualification-photo' fallbackSrc='/samples/square.webp' w='45px' h='45px' mr={4} />
        <Box>
          <Heading size='sm'>{item.name}</Heading>
          <Text color='gray.600' fontSize='sm'>{item.issuingOrganisation}</Text>
          <Flex color='gray.600' fontSize='smaller'>
            {
              item.issuanceDate &&
              <>Issued {DateTime.fromISO(item.issuanceDate).setLocale('fr').toLocaleString(DateTime.DATE_SHORT)}</>
            }
            {
              (item.issuanceDate && item.expirationDate) &&
              <Interpunct />
            }
            {
              item.expirationDate ?
                <>&nbsp;Expires on {DateTime.fromISO(item.issuanceDate).setLocale('fr').toLocaleString(DateTime.DATE_SHORT)}</>
                :
                <>&nbsp;No Expiration Date</>
            }
          </Flex>
          <Text color='gray.600' fontSize='smaller'>Credential ID {item?.credentialID}</Text>
          {
            item.credentialURL &&
            <Link href={item.credentialURL} color='gray.700' fontSize='sm' mt={1}>See credential</Link>
          }
        </Box>
        {
          data?.user?.id == me?.id &&
          <Box ml='auto'>
            <Button variant='ghost' w='40px' h='40px' mr={2} onClick={onEditingQualificationOpen} >
              <Icon as={() => <Box className='fa-regular fa-pen' />} />
            </Button>
            <Modal isOpen={isEditingQualificationOpen} onClose={onEditingQualificationClose} size='2xl'>
              <Formik
                initialValues={{ name: item.name, issuingOrganisation: item.issuingOrganisation, issuanceDate: item.issuanceDate, expire: item.expire, expirationDate: item.expirationDate, credentialID: item.credentialID, credentialURL: item.credentialURL, photo: null }}
                onSubmit={async values => {
                  await updateQualification({ id: item.id, input: values })
                  onEditingQualificationClose()
                }}
              >
                {({ isSubmitting }) =>
                  <Form>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Update license or certification</ModalHeader>
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
            <Button variant='ghost' w='40px' h='40px' mr={2} onClick={async () => { await deleteQualification({ id: item.id }) }}>
              <Icon as={() => <Box className='fa-regular fa-trash' />} />
            </Button>
          </Box>
        }
      </Flex>
    </GridItem>
  )
}
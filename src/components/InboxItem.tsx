import { Flex, Avatar, IconButton, Text, Box, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Button, VStack, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Dispatch, useState } from 'react'
import { InboxesQuery, useDeleteConversationMutation } from 'src/generated/graphql'
import { FormSuccessMessage } from './FormSuccessMessage'
import { InputField } from './InputField'
import { NoUnderlineLink } from './NoUnderlineLink'

interface InboxItemProps {
  conversationId: string
  setConversationId: Dispatch<string>
  data: InboxesQuery
  inbox: InboxesQuery['inboxes'][0]
  index: number
}

export const InboxItem = (props: InboxItemProps): JSX.Element => {
  const { data, setConversationId, inbox, conversationId, index } = props
  const [showEllipsis, setShowEllipsis] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [,  deleteConversation] = useDeleteConversationMutation()

  return (
    <Flex
      onClick={() => {
        setConversationId(inbox.firestoreCollectionId)
      }}
      key={inbox.partner.id}
      h='60px'
      p={2}
      align='center'
      cursor='pointer'
      borderRadius='8px'
      mb={index != data.inboxes.length - 1 ? 2 : 0}
      bgColor={inbox.firestoreCollectionId == conversationId ? 'gray.100' : 'white'}
      _hover={{ bgColor: 'gray.200' }}
      onMouseOver={() => { setShowEllipsis(true) }}
      onMouseLeave={() => { setShowEllipsis(false) }}
    >
      <Avatar w='46px' h='46px' src={inbox.partner.avatarUrl} />
      <Text ml={4} size='md'>u/{inbox.partner.username}</Text>
      {
        showEllipsis &&
        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label=''
              ml='auto'
              borderRadius='50%'
              size='sm'
              bgColor='transparent'
              icon={<Box className='fa-solid fa-ellipsis' />}
              _focusVisible={{ boxShadow: '0 0 0 3px #48BB78' }}
              _hover={{ bgColor: 'gray.300' }}
              _active={{ bgColor: 'gray.400' }}
            />
          </PopoverTrigger>
          <PopoverContent w='7.5rem'>
            <PopoverArrow />
            <PopoverBody pl={2} pr={2}>
              <VStack align='stretch'>
                <Button w='full' onClick={onOpen} color='red.600'>Remove</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Delete Conversation</ModalHeader>
                    <ModalCloseButton _focusVisible={{ boxShadow: '0 0 0 3px #68D391;' }} />
                    <ModalBody>
                      Are you sure you want to delete this conversation?
                    </ModalBody>
                    <ModalFooter>
                      <Flex justify='center' align='center' w='full'>
                        <Button colorScheme='red' onClick={async () => {
                          await deleteConversation({ firestoreCollectionId: conversationId }) 
                          onClose()
                        }}>
                          Delete
                        </Button>
                      </Flex>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      }
    </Flex>
  )
}
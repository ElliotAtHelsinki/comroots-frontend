import { Avatar, Box, Button, Flex, IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text, VStack } from '@chakra-ui/react'
import { DocumentData } from 'firebase/firestore'
import { useState } from 'react'
import { ParticipantsQuery, useDeleteMessageMutation } from 'src/generated/graphql'
import { useUser } from 'src/hooks'

interface MessageProps {
  message: DocumentData
  userId: number
  user?: ReturnType<typeof useUser>
  partner?: ParticipantsQuery['participants'][0]
  conversationId: string
}

export const Message = (props: MessageProps): JSX.Element => {
  const { message, userId, user, partner, conversationId } = props
  const [showEllipsis, setShowEllipsis] = useState(false)
  const [, deleteMessage] = useDeleteMessageMutation()
  return (
    <Flex onMouseOver={() => { setShowEllipsis(true) }} onMouseLeave={() => { setShowEllipsis(false) }} w='full' align='center'>
      {
        message.senderId != userId ? (
          <>
            <Avatar
              src={message.senderId == userId ? user?.avatarUrl : partner?.avatarUrl}
              w='30px'
              h='30px'
            />
            <Text
              maxW='70%'
              m='0.5rem 0'
              borderRadius='0.5rem'
              fontSize='0.85rem'
              fontFamily='"Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif'
              p='0.5rem 0.75rem'
              resize='none'
              mr='auto'
              ml='0.75rem'
              color='#3A3B3C'
              bgColor='#E4E6EB'
            >
              {message.content}
            </Text>
          </>
        ) : (
          <>
            {
              showEllipsis &&
              <Popover placement='top'>
                <PopoverTrigger>
                  <IconButton
                    aria-label=''
                    ml='auto'
                    mr={2}
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
                      <Button w='full' onClick={async () => {
                        await deleteMessage({
                          firestoreCollectionId: conversationId,
                          messageDocumentId: message.id,
                        })
                      }} color='red.600'>Remove</Button>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            }
            <Text
              maxW='70%'
              m='0.5rem 0'
              borderRadius='0.5rem'
              fontSize='0.85rem'
              fontFamily='"Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif'
              p='0.5rem 0.75rem'
              resize='none'
              mr='0.75rem'
              color='white'
              bgColor='gray.500'
              ml={!showEllipsis ? 'auto' : undefined}
            >
              {message.content}
            </Text>
            <Avatar
              src={message.senderId == userId ? user?.avatarUrl : partner?.avatarUrl}
              w='30px'
              h='30px'
            />
          </>
        )
      }
    </Flex>
  )
}
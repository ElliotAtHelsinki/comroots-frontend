import { Avatar, Box, Flex, Heading, IconButton, Link, Text } from '@chakra-ui/react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import cloneDeep from 'lodash/cloneDeep'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import NextLink from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import NoSSR from 'react-no-ssr'
import { CreateConversationButton, InboxItem, Message, TextareaAutosize } from 'src/components'
import { useCreateMessageMutation, useInboxesQuery, useParticipantsQuery } from 'src/generated/graphql'
import { useIsAuth, useUser } from 'src/hooks'
import { firestore } from 'src/lib'
import { createURQLClient } from 'src/utils'

interface ChatProps {

}

const Chat: NextPage<ChatProps> = () => {
  useIsAuth(true)
  const user = useUser()
  const userId = useMemo(() => user?.id, [user])
  const [inboxRef, setInboxRef] = useState(null)
  useEffect(() => {
    (async () => {
      if (userId) {
        const q = query(collection(firestore, 'inboxes'), where('userId', '==', userId))
        const res = await getDocs(q)
        setInboxRef(res.docs[0].ref)
      }
    })()
  }, [userId])
  const [value] = useDocumentData(inboxRef)
  const [conversationId, setConversationId] = useState(value?.conversationId)
  const [{ data: participantsData }] = useParticipantsQuery({
    pause: !conversationId,
    variables: {
      firestoreCollectionId: conversationId
    }
  })
  const partner = useMemo(() => {
    return participantsData?.participants?.find(p => p.id != userId)
  }, [participantsData])
  useEffect(() => {
    if (value) {
      setConversationId(value.conversationIds[value.conversationIds?.length - 1])
    }
  }, [value])
  const messagesRef = collection(firestore, `conversations/${conversationId}/messages`)
  const [values] = useCollectionData(messagesRef)
  const sortedValues = useMemo(() => {
    return values?.sort((a, b) => a.createdAt - b.createdAt)
  }, [values])

  const [{ data }] = useInboxesQuery({
    pause: !value?.conversationIds,
    variables: {
      firestoreCollectionIds: cloneDeep(value?.conversationIds)?.reverse()
    }
  })
  const [userInput, setUserInput] = useState('')
  const [, createMessage] = useCreateMessageMutation()
  const submit = useCallback(async () => {
    setUserInput('')
    await createMessage({
      firestoreCollectionId: conversationId,
      input: {
        type: 'text',
        text: userInput,
      }
    })
  }, [userInput, conversationId])
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [sortedValues])
  const [showRightBar, setShowRightBar] = useState(true)
  const [showLeftBar, setShowLeftBar] = useState(true)
  const rightBarRef = useRef(null)
  const leftBarRef = useRef(null)
  const windowRef = useRef(null)
  useEffect(() => {
    if (windowRef?.current?.clientWidth < 800) {
      setShowLeftBar(false)
      setShowRightBar(false)
    }
    else if (windowRef?.current?.clientWidth < 1103.5) {
      setShowLeftBar(true)
      setShowRightBar(false)
    }
    else {
      setShowLeftBar(true)
      setShowRightBar(true)
    }
  }, [windowRef?.current?.clientWidth])

  return (
    <>
      <Head>
        <title>Chat | Comroots</title>
        <meta property='og:title' content='Chat | Comroots' key='title' />
        <meta name='description' content='Chat' />
      </Head>
      <NoSSR onSSR='Loading...'>
        <Flex ref={windowRef} w='100vw' h='100vh' boxSizing='border-box' overflow='hidden'>
          {
            showLeftBar &&
            <Box ref={leftBarRef} minW={windowRef?.current?.clientWidth >= 940 ? '340px' : '200px'} w='340px' h='full' overflow='hidden' borderBottomWidth='1.25px' borderRightWidth='1.25px' borderColor='gray.300'>
              <Flex w='full' h='55px' minH='55px' borderBottomWidth='1.25px' borderColor='gray.300' position='sticky' justify='space-between' align='center' pl={4} pr={4}>
                <Avatar w='40px' h='40px' src={user?.avatarUrl} />
                <Text fontSize='sm'>Chats</Text>
                <CreateConversationButton setConversationId={setConversationId} />
              </Flex>
              <Box w='full' h='full' boxSizing='border-box' overflowY='scroll' p={2}>
                {data?.inboxes.map((inbox, index) => (
                  <InboxItem key={index} data={data} inbox={inbox} conversationId={conversationId} index={index} setConversationId={setConversationId} />
                ))}
              </Box>
            </Box>
          }
          <Flex flexDir='column' minW='600px' w='full' h='full'>
            <Flex w='full' h='55px' minH='55px' borderBottomWidth='1.25px' borderColor='gray.300' position='sticky' align='center' pl={4} pr={4}>
              <NextLink passHref href='/u/[user]' as={`/u/${partner?.username}`}>
                <Flex align='center' _hover={{ bgColor: 'gray.200' }} p='0.25rem 0.5rem 0.25rem 0.5rem' borderRadius='8px' cursor='pointer'>
                  <Avatar w='36px' h='36px' src={partner?.avatarUrl} />
                  <Text fontSize='sm' ml={3}>{partner?.fullName ?? `u/${partner?.username}`}</Text>
                </Flex>
              </NextLink>
              <IconButton
                aria-label=''
                ml='auto'
                borderRadius='50%'
                size='sm'
                bgColor='transparent'
                _focusVisible={{ boxShadow: '0 0 0 3px #68D391' }}
                transform={!showRightBar ? 'rotate(90deg)' : undefined}
                icon={<Box className='fa-solid fa-ellipsis' />}
                onClick={() => { setShowRightBar(prev => !prev) }}
              />
            </Flex>
            <Flex w='full' h='calc(100vh - 110px)' flexDir='column' overflowY='scroll' p={2}>
              {
                sortedValues?.map((message, index) => (
                  <Flex key={index} align='center'>
                    <Message message={message} userId={userId} partner={partner} user={user} conversationId={conversationId} />
                    <div ref={messagesEndRef} />
                  </Flex>
                ))
              }
            </Flex>
            <Flex w='full' minH='55px' borderTopWidth='1.25px' borderColor='gray.300' mt='auto' align='center' pl={4} pr={4}>
              <TextareaAutosize
                placeholder='Aa'
                resize='none'
                minH='0'
                borderRadius='md'
                mt={4}
                mb={4}
                size='sm'
                onChange={(e) => { setUserInput(e.currentTarget.value) }}
                onKeyDown={(e) => {
                  if (e.key == 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    submit()
                  }
                }}
                spellCheck={false}
                value={userInput}
              />
              <IconButton onClick={() => { submit() }} aria-label='send-message-button' ml={4} icon={<Box color='green.400' className='fa-solid fa-paper-plane' />} />
            </Flex>
          </Flex>
          {
            showRightBar &&
            <Flex ref={rightBarRef} flexDir='column' justify='center' align='center' minW='340px' h='full' ml='auto' borderWidth='1.25px' borderColor='gray.300'>
              <Avatar w='72px' h='72px' src={partner?.avatarUrl} mb={2} />
              <NextLink passHref href='/u/[user]' as={`/u/${partner?.username}`}>
                <Link>
                  <Heading fontSize='sm'>{partner?.fullName ?? `u/${partner?.username}`}</Heading>
                </Link>
              </NextLink>
            </Flex>
          }
        </Flex>
      </NoSSR>
    </>
  )
}

export default withUrqlClient(createURQLClient, { ssr: false })(Chat)
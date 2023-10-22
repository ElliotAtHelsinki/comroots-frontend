import { Avatar, Box, Button, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tag, TagLabel, TagLeftIcon, Text, useDisclosure } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState } from 'react'
import { CommentVoteSection, ContainedButton, EditDeleteCommentButtons, EditDeletePostButtons, InputField, Layout, OutlinedButton, SelectField, tagStylingMap } from 'src/components'
import { useCommentsQuery, useCreateCommentMutation } from 'src/generated/graphql'
import { useCheckPageOwnership, useGetPostFromURL, useGetQueryID, usePageOptions, useRequireLogin, useUser } from 'src/hooks'
import { createURQLClient } from 'src/utils'
const QuillDisplay = dynamic(() => import('src/components/QuillDisplay.client'), { ssr: false })
interface PostProps {

}

const Post: NextPage<PostProps> = () => {
  const user = useUser()
  const { pageOptions } = usePageOptions()

  const checkPageOwnership = useCheckPageOwnership()
  const requireLogin = useRequireLogin()
  const intId = useGetQueryID()

  const [variables, setVariables] = useState<{ limit: number, cursor: string | null }>
    ({ limit: 5, cursor: null })

  const [{ data, error, fetching }] = useGetPostFromURL()
  const [{ data: commentsData }] = useCommentsQuery({
    pause: intId == -1,
    variables: {
      ...variables,
      postId: intId
    }
  })

  const [, createComment] = useCreateCommentMutation()

  const { isOpen, onOpen, onClose } = useDisclosure()

  let returnValue

  if (fetching) {
    returnValue = <>loading...</>
  }

  else if (error) {
    returnValue = <>{error.message}</>
  }

  else if (!data?.post) {
    returnValue =
      <Layout>
        <Box>Post not found.</Box>
      </Layout>
  }

  else {
    returnValue =
      <Layout>
        <Box w='full' p='10' bgColor='white' shadow='lg' mb='4'>
          <Heading mb='0.625rem'>{data.post.title}</Heading>
          <Flex mb={4}>
            {
              data.post.tags?.map((t, index) => {
                const tagStyling = tagStylingMap[`${t.name}`]
                return (
                  <Tag key={index} colorScheme={tagStyling.colorScheme} mr={2}>
                    <Flex align='center'>
                      {
                        tagStyling.icon &&
                        <Flex w='20px' justify='center' align='center' mr={1}>
                          <TagLeftIcon as={() => tagStyling.icon} />
                        </Flex>
                      }
                      <TagLabel color={tagStyling.textColor ? tagStyling.textColor : undefined}>{t.name}</TagLabel>
                    </Flex>
                  </Tag>
                )
              })
            }
          </Flex>
          <QuillDisplay value={data.post.text} />
          {
            ((user?.id && user.id == data.post.creator?.id) || checkPageOwnership(data.post.pageCreator?.id)) &&
            <Flex w='calc(80px + 0.5rem)' mt={4} justifyContent='space-between'>
              <EditDeletePostButtons id={data.post.id} />
            </Flex>
          }
        </Box>
        <OutlinedButton
          w='120px'
          mt={6}
          onClick={() => {
            requireLogin()
            onOpen()
          }}
        >
          Comment
        </OutlinedButton>
        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
          <Formik
            initialValues={{ postId: intId, text: '', pageId: undefined }}
            onSubmit={async values => {
              await createComment(values)
              onClose()
            }}
          >
            {({ isSubmitting }) =>
              <Form>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Comment</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <SelectField
                      name='pageId'
                      label='Comment as:'
                      isMulti={false}
                      options={pageOptions}
                    />
                    <InputField name='text' placeholder='comment...' label='' inputType='textarea' />
                  </ModalBody>
                  <ModalFooter>
                    <Flex w='full' justify='center'>
                      <ContainedButton baseColorLevel={500} type='submit' isLoading={isSubmitting} >
                        Submit
                      </ContainedButton>
                    </Flex>
                  </ModalFooter>
                </ModalContent>
              </Form>
            }
          </Formik>
        </Modal>
        <Stack spacing={8} mb={8} mt={4}>
          {
            commentsData?.comments?.comments?.map(c =>
              <Flex key={c.id} pl={5} pr={5} pt={3} pb={3} align='center' shadow='md' borderWidth='1px' bgColor='white' >
                <Flex flexDir='column' align='center' mr={5} >
                  <Avatar
                    name={c.creatorType == 'user' ? c.creator.username : c.pageCreator.pageName}
                    fontSize='3xl'
                  />
                </Flex>
                <Box>
                  <Text>
                    {c.creatorType == 'user' ? c.creator.username : c.pageCreator.pageName}
                  </Text>
                  <Text wordBreak='break-word'>{c.text}</Text>
                  <CommentVoteSection comment={c} />
                </Box>
                {
                  ((user?.id && user.id == c?.creator?.id) || checkPageOwnership(c?.pageCreator?.id)) &&
                  <Flex flexDir='column' ml='auto'>
                    <EditDeleteCommentButtons comment={c} />
                  </Flex>
                }
              </Flex>
            )
          }
          {
            commentsData?.comments?.hasMore &&
            <Flex>
              <Button
                onClick={() => {
                  setVariables({
                    limit: variables.limit,
                    cursor: commentsData.comments.comments[commentsData.comments.comments.length - 1].createdAt
                  })
                }}
                isLoading={fetching}
                m='auto'
                my={8}
              >
                Load more
              </Button>
            </Flex>
          }
        </Stack>
      </Layout>
  }

  return (
    <>
      <Head>
        <title>Post | Comroots</title>
        <meta property='og:title' content='Post | Comroots' key='title' />
        <meta name='description' content='Post' />
      </Head>
      {returnValue}
    </>
  )
}

export default withUrqlClient(createURQLClient, { ssr: false })(Post)
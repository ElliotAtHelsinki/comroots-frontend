import { Box, Button, Flex, Heading, Link, Stack, Tag, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react'
import cloneDeep from 'lodash/cloneDeep'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import NoSSR from 'react-no-ssr'
import { PostsQuery } from 'src/generated/graphql'
import { useCheckPageOwnership, useUser } from 'src/hooks'
import { EditDeletePostButtons } from './EditDeletePostButtons'
import { tagStylingMap } from './tagStylingMap'
import { VoteSection } from './VoteSection'
const QuillDisplay = dynamic(() => import('src/components/QuillDisplay.client'), { ssr: false })

interface IndexPostsProps {
  postsData: PostsQuery
  postsFetching: boolean
  user: ReturnType<typeof useUser>
  postsVariables: { limit: number, cursor: string | null }
  setPostsVariables: Dispatch<SetStateAction<{ limit: number, cursor: string | null }>>
}

export const IndexPosts = (props: IndexPostsProps): JSX.Element => {
  const { postsData, postsFetching, user, postsVariables, setPostsVariables } = props
  const checkPageOwnership = useCheckPageOwnership()

  return (
    <>
      {
        !postsData || postsFetching ? <Box mt={4}>loading...</Box> :
          <Stack spacing={8} mb={8} mt={8}>
            {
              postsData?.posts?.posts?.length > 0 &&
              postsData.posts.posts.map(p =>
                p &&
                <Flex key={p.id} pl={5} pr={5} pt={3} pb={3} shadow='md' borderWidth='1px' bgColor='white' >
                  <VoteSection post={cloneDeep(p)} />  {/* clone to avoid side effect of up/downvoting on video */}
                  <Flex alignItems='center' flex={1}>
                    <Box h='full'>
                      <Flex fontSize='sm' mt={1.5} mb={1}>
                        <Text>Posted by&nbsp;</Text>
                        <NextLink passHref
                          href={p.creatorType == 'user' ? `/u/[user]` : `/p/[page]`}
                          as={p.creatorType == 'user' ? `/u/${p.creator.username}` : `/p/${p?.pageCreator.pageName}`}
                        >
                          <Link>
                            {p.creatorType == 'user' ? `u/${p.creator.username}` : `p/${p?.pageCreator.pageName}`}
                          </Link>
                        </NextLink>
                        <Text>&nbsp;in&nbsp;</Text>
                        <NextLink passHref href='/s/[id]' as={`/s/${p?.space?.spaceName}`}>
                          <Link>
                            s/{p?.space?.spaceName}
                          </Link>
                        </NextLink>
                      </Flex>
                      <NextLink passHref href='/post/[id]' as={`/post/${p.id}`} >
                        <Link>
                          <Heading fontSize='xl' mb={2}>{p.title}</Heading>
                        </Link>
                      </NextLink>
                      <Flex mb={3}>
                        {
                          p.tags?.map((t, index) => {
                            const tagStyling = tagStylingMap[`${t.name}`]
                            return (
                              t &&
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
                      <NoSSR onSSR='Loading...'>
                        <QuillDisplay value={p.text} />
                      </NoSSR>
                    </Box>
                    {
                      ((user?.id && user.id == p?.creator?.id) || checkPageOwnership(p?.pageCreator?.id)) &&
                      <Flex flexDir='column' justifyContent='space-between' ml='auto' height='calc(80px + 0.25rem)'>
                        <EditDeletePostButtons id={p.id} />
                      </Flex>
                    }
                  </Flex>
                </Flex>
              )
            }
          </Stack>
      }
      {
        postsData?.posts?.hasMore &&
        <Flex>
          <Button
            onClick={() => {
              setPostsVariables({
                limit: postsVariables.limit,
                cursor: postsData.posts.posts[postsData.posts.posts.length - 1].createdAt
              })
            }}
            isLoading={postsFetching}
            m='auto'
            my={8}
          >
            Load more
          </Button>
        </Flex>
      }
    </>
  )
}

import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { RegularCommentFragment, useVoteCommentMutation } from 'src/generated/graphql'
import { useRequireLogin } from 'src/hooks'

interface CommentVoteSectionProps {
  comment: RegularCommentFragment
}

export const CommentVoteSection = (props: CommentVoteSectionProps): JSX.Element => {
  const { comment: c } = props
  const [loadingState, setLoadingState] = useState<'upvote-loading' | 'downvote-loading' | 'not-loading'>
    ('not-loading')
  const [, voteComment] = useVoteCommentMutation()
  const requireLogin = useRequireLogin()
  return (
    <Flex alignItems='center' ml='-3'>
      <IconButton
        onClick={async () => {
          setLoadingState('upvote-loading')
          requireLogin()
          await voteComment({
            commentId: c.id,
            value: 1,
          })
          setLoadingState('not-loading')
        }}
        isLoading={loadingState == 'upvote-loading'}
        icon={
          <ArrowUpIcon boxSize='22px' />
        }
        color={c.voteStatus == 1 ? 'green' : ''}
        bg='transparent'
        aria-label='upvote'
      />
      <Text ml={2} mr={2}>{c.points}</Text>
      <IconButton
        onClick={async () => {
          setLoadingState('downvote-loading')
          requireLogin()
          await voteComment({
            commentId: c.id,
            value: -1,
          })
          setLoadingState('not-loading')
        }}
        isLoading={loadingState == 'downvote-loading'}
        icon={
          <ArrowDownIcon boxSize='22px' />
        }
        color={c.voteStatus == -1 ? 'tomato' : ''}
        bg='transparent'
        aria-label='downvote'
      />
    </Flex>
  )
}
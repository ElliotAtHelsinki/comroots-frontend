import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { Flex, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { RegularPostFragment, useVoteMutation } from 'src/generated/graphql'
import { useRequireLogin } from 'src/hooks'

interface VoteSectionProps {
  post: RegularPostFragment
}

export const VoteSection = (props: VoteSectionProps): JSX.Element => {
  const { post: p } = props
  const [loadingState, setLoadingState] = useState<'upvote-loading' | 'downvote-loading' | 'not-loading'>
    ('not-loading')
  const [, vote] = useVoteMutation()
  const requireLogin = useRequireLogin()
  return (
    <Flex flexDir='column' alignItems='center' justifyContent='center' mr={4}>
      <IconButton
        onClick={async () => {
          setLoadingState('upvote-loading')
          requireLogin()
          await vote({
            postId: p.id,
            value: 1,
          })
          setLoadingState('not-loading')
        }}
        isLoading={loadingState == 'upvote-loading'}
        icon={
          <ArrowUpIcon boxSize='22px' />
        }
        color={p.voteStatus == 1 ? 'green' : ''}
        bg='transparent'
        aria-label='upvote'
      />
      {p.points}
      <IconButton
        onClick={async () => {
          setLoadingState('downvote-loading')
          requireLogin()
          await vote({
            postId: p.id,
            value: -1,
          })
          setLoadingState('not-loading')
        }}
        isLoading={loadingState == 'downvote-loading'}
        icon={
          <ArrowDownIcon boxSize='22px' />
        }
          color={p.voteStatus == -1 ? 'tomato' : ''}
        bg='transparent'
        aria-label='downvote'
      />
    </Flex>
  )
}
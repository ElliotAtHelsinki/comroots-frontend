import { Button, ButtonProps } from '@chakra-ui/react'
import { PageQuery, useFollowMutation, useUnfollowMutation, useFollowStatusQuery } from 'src/generated/graphql'
import { useRequireLogin } from 'src/hooks'

type FollowPageButtonProps = ButtonProps & {
  data: PageQuery
}

export const FollowPageButton = (props: FollowPageButtonProps): JSX.Element => {
  const { data, ...rest } = props
  const requireLogin = useRequireLogin()
  const [, followPage] = useFollowMutation()
  const [, unfollowPage] = useUnfollowMutation()
  const [{ data: pageFollowStatusData }] = useFollowStatusQuery({
    pause: !data?.page?.id,
    variables: {
      pageId: data?.page?.id
    }
  })
  return (
    <Button
      variant='ghost'
      position='absolute'
      color={pageFollowStatusData?.followStatus ? 'red.500' : 'green.500'}
      onClick={async () => {
        requireLogin()
        if (pageFollowStatusData?.followStatus) {
          await unfollowPage({ pageId: data?.page?.id })
        }
        else {
          await followPage({ pageId: data?.page?.id })
        }
      }}
      {...props}
    >
      {
        pageFollowStatusData?.followStatus ? 'unfollow' : 'follow'
      }
    </Button>
  )
}
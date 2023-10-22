import { Button } from '@chakra-ui/react'
import { UserQuery, useFollowUserMutation, useUnfollowUserMutation, useUserFollowStatusQuery } from 'src/generated/graphql'
import { useRequireLogin } from 'src/hooks'

interface FollowUserButtonProps {
  data: UserQuery
}

export const FollowUserButton = (props: FollowUserButtonProps): JSX.Element => {
  const { data } = props
  const requireLogin = useRequireLogin()
  const [, followUser] = useFollowUserMutation()
  const [, unfollowUser] = useUnfollowUserMutation()
  const [{ data: userFollowStatusData }] = useUserFollowStatusQuery({
    pause: !data?.user?.id,
    variables: {
      id: data?.user?.id
    }
  })
  return (
    <Button
      variant='ghost'
      mr={4}
      ml='auto'
      color={userFollowStatusData?.userFollowStatus ? 'red.500' : 'green.500'}
      onClick={async () => {
        requireLogin()
        if (userFollowStatusData?.userFollowStatus) {
          await unfollowUser({ id: data?.user?.id })
        }
        else {
          await followUser({ id: data?.user?.id })
        }
      }}
    >
      {
        userFollowStatusData?.userFollowStatus ? 'unfollow' : 'follow'
      }
    </Button>
  )
}
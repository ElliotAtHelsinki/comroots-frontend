import { Button, ButtonProps } from '@chakra-ui/react'
import { SpaceQuery, useSubscribeMutation, useSubscriptionStatusQuery, useUnsubscribeMutation } from 'src/generated/graphql'
import { useRequireLogin } from 'src/hooks'

type SubscribeSpaceButtonProps = ButtonProps & {
  data: SpaceQuery
}

export const SubscribeSpaceButton = (props: SubscribeSpaceButtonProps): JSX.Element => {
  const { data, ...rest } = props
  const requireLogin = useRequireLogin()
  const [, subscribe] = useSubscribeMutation()
  const [, unsubscribe] = useUnsubscribeMutation()
  const [{ data: spaceSubscriptionStatusData }] = useSubscriptionStatusQuery({
    pause: !data?.space?.id,
    variables: {
      spaceId: data?.space?.id
    }
  })
  return (
    <Button
      variant='ghost'
      position='absolute'
      color={spaceSubscriptionStatusData?.subscriptionStatus ? 'red.500' : 'green.500'}
      onClick={async () => {
        requireLogin()
        if (spaceSubscriptionStatusData?.subscriptionStatus) {
          await unsubscribe({ spaceId: data?.space?.id })
        }
        else {
          await subscribe({ spaceId: data?.space?.id })
        }
      }}
      {...props}
    >
      {
        spaceSubscriptionStatusData?.subscriptionStatus ? 'unsubscribe' : 'subscribe'
      }
    </Button>
  )
}
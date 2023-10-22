import { Flex, Avatar } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useMyPages } from './useMyPages'
import { useUser } from './useUser'
import { useUserAvatar } from './useUserAvatar'

export const usePageOptions = () => {
  const user = useUser()
  const myPages = useMyPages()
  const avatarURL = useUserAvatar()

  const defaultValue = useMemo(() => ({
    label: <Flex align='center'>
      <Avatar
        name={user?.username}
        src={avatarURL}
        size='sm'
        mr={2}
      />
      u/{user?.username}
    </Flex>,
    value: undefined
  }), [user, avatarURL])

  const pageOptions = useMemo(() => {
    const arr = [defaultValue]
    myPages?.forEach(p => {
      arr.push({
        label: <Flex align='center'>
          <Avatar
            name={p?.pageName}
            src={p?.avatarUrl}
            size='sm'
            mr={2}
          />
          p/{p?.pageName}
        </Flex>,
        value: p.id
      })
    })
    return arr
  }, [user, myPages, avatarURL])

  return { pageOptions, defaultValue }
}
import { useMeQuery, useMyPagesQuery } from 'src/generated/graphql'

export const useCheckPageOwnership = () => {
  const [{ data: meData }] = useMeQuery()
  const [{ data }] = useMyPagesQuery()
  return (id: number) => meData?.me?.id && data?.myPages?.map(p => p.id).includes(id)
}
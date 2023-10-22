import { useMyPagesQuery } from 'src/generated/graphql'

export const useMyPages = () => {
  const [{ data }] = useMyPagesQuery()
  return data?.myPages
}
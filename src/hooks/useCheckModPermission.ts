import { useMySpacesQuery } from 'src/generated/graphql'

export const useCheckModPermission = () => {
  const [{ data }] = useMySpacesQuery()
  return (id: number) => data?.mySpaces?.map(s => s.id).includes(id)
}
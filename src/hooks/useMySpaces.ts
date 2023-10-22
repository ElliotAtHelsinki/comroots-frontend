import { useMySpacesQuery } from 'src/generated/graphql'

export const useMySpaces = () => {
  const [{ data }] = useMySpacesQuery()
  return data?.mySpaces
}
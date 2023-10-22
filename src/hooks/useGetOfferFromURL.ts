import { useOfferQuery } from 'src/generated/graphql'
import { useGetQueryID } from './useGetQueryID'

export const useGetOfferFromURL = () => {
  const intId = useGetQueryID()
  return useOfferQuery({
    pause: intId == -1,
    variables: {
      id: intId
    }
  })
}
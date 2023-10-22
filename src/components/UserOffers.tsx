import { Box } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { AppliedOffersQuery, OffersQuery } from 'src/generated/graphql'
import { useUser } from 'src/hooks'
import { AppliedOffers } from './AppliedOffers'
import { PostedOffers } from './PostedOffers'
import { TabButtons } from './TabButtons'

interface UserOffersProps {
  userId: number
  me: ReturnType<typeof useUser>
  offersData: OffersQuery
  offersFetching: boolean
  appliedOffersData: AppliedOffersQuery
  appliedOffersFetching: boolean
  offersVariables: { limit: number, cursor: string | null, userId: number }
  setOffersVariables: Dispatch<SetStateAction<{ limit: number, cursor: string | null, userId: number }>>
}

export const UserOffers = (props: UserOffersProps): JSX.Element => {
  const { userId, me, offersData, offersFetching, appliedOffersData, appliedOffersFetching, offersVariables, setOffersVariables } = props
  const [offersTab, setOffersTab] = useState('Posted')

  return (
    <>
      {
        userId == me?.id ?
          <>
            <Box mt={4}>
              <TabButtons tabs={['Applied', 'Posted']} defaultTab={offersTab} setActive={setOffersTab} />
            </Box>
            {
              offersTab == 'Posted' ?
                <PostedOffers me={me} offersData={offersData} offersFetching={offersFetching} offersVariables={offersVariables} setOffersVariables={setOffersVariables} />
                :
                <AppliedOffers appliedOffersData={appliedOffersData} appliedOffersFetching={appliedOffersFetching} me={me} />
            }
          </>
          :
          <PostedOffers me={me} offersData={offersData} offersFetching={offersFetching} offersVariables={offersVariables} setOffersVariables={setOffersVariables} />
      }
    </>
  )
}
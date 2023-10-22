import { useEffect } from 'react'
import { useTriggerOffersInvalidateMutation, useTriggerPostsInvalidateMutation } from 'src/generated/graphql'

export const useInvalidators = () => {
  const [, triggerPostsInvalidate] = useTriggerPostsInvalidateMutation()
  const [, triggerOffersInvalidate] = useTriggerOffersInvalidateMutation()
  return {
    triggerPostsInvalidate,
    triggerOffersInvalidate
  }
}
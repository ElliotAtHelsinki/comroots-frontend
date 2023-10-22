import { useEffect } from 'react'
import { useInvalidators } from './useInvalidators'

export const useTriggerInvalidates = () => {
  const { triggerOffersInvalidate, triggerPostsInvalidate } = useInvalidators()
  useEffect(() => {
    triggerOffersInvalidate()
    triggerPostsInvalidate()
  }, [])
}
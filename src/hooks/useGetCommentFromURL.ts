
import { useCommentsQuery, usePostQuery } from 'src/generated/graphql'
import { useGetQueryID } from './useGetQueryID'

export const useGetCommentFromURL = () => {
  const intId = useGetQueryID()
  return }
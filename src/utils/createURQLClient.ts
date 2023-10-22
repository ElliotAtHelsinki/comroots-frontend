import { Cache, cacheExchange, Resolver } from '@urql/exchange-graphcache'
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch'
import capitalize from 'lodash/capitalize'
import { NextUrqlClientConfig } from 'next-urql'
import Router from 'next/router'
import { DeleteCommentMutationVariables, DeleteOfferMutationVariables, DeletePageMutationVariables, DeletePostMutationVariables, DeleteSpaceMutationVariables, LoginMutation, MeDocument, MeQuery, RegisterMutation, VoteCommentMutationVariables, VoteMutationVariables } from 'src/generated/graphql'
import { dedupExchange, Exchange, gql } from 'urql'
import { pipe, tap } from 'wonka'
import { isServer } from './isServer'

export const cursorPagination = (itemName: string): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info
    const allFields = cache.inspectFields(entityKey)
    const fieldInfos = allFields.filter(info => info.fieldName == fieldName)
    const size = fieldInfos.length

    if (size == 0) {
      return undefined
    }

    const inCache = cache.resolve(
      cache.resolve(entityKey, fieldName, fieldArgs) as string,
      `${itemName}s`
    )

    info.partial = !inCache

    let hasMore = true
    const results: string[] = []
    fieldInfos?.forEach(fi => {
      const key = cache.resolve(entityKey, fi.fieldName, fi.arguments) as string
      const _hasMore = cache.resolve(key, 'hasMore') // true/false
      const items = cache.resolve(key, `${itemName}s`) as string[]
      if (!_hasMore) {
        hasMore = false
      }
      if (items) {
        results.push(...items)
      }
      else {
        results.push(null)
      }
    })

    const returnObj = {
      __typename: `Paginated${capitalize(itemName)}s`,
      hasMore
    }
    returnObj[`${itemName}s`] = results
    return returnObj
  }
}

const errorExchange: Exchange = ({ forward }) => ops$ => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      const pathsToRedirect = [
        '/chat',
        '/create-offers',
        '/create-page',
        '/create-post',
        '/create-space',
        '/managed-pages',
        '/managed-spaces',
        '/new-page',
        '/settings'
      ]
      if (error?.message.includes('Not authenticated') && pathsToRedirect.includes(Router.asPath)) {
        Router.replace('/login')
      }
      if (error?.message.includes('Not authorised')) {
        alert('Not authorised!')
      }
    })
  )
}

const invalidateSingle = (cache: Cache, itemName: string) => {
  const fields = cache.inspectFields('Query')
  const target = fields.find(f => f.fieldName == itemName)
  if (target) {
    cache.invalidate('Query', target.fieldName, target.arguments)
  }
}

const invalidateAll = (cache: Cache, itemName: string) => {
  const allFields = cache.inspectFields('Query')
  const fieldInfos = allFields.filter(info => info.fieldName == `${itemName}s`)
  for (let info of fieldInfos) {
    cache.invalidate('Query', `${itemName}s`, info.arguments)
  }
}

// @ts-ignore
export const createURQLClient: NextUrqlClientConfig = (ssrExchange, ctx) => {
  let cookie = ''
  if (isServer() && ctx?.req?.headers?.cookie) {
    cookie = ctx.req.headers.cookie
  }
  return {
    url: process.env.NEXT_PUBLIC_API_URL,
    fetchOptions: {
      credentials: 'include',
      headers: cookie ? { cookie } : undefined
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
          PaginatedComments: () => null,
          PaginatedOffers: () => null,
          avatars: () => null,
          spaceAvatars: () => null,
          pageAvatars: () => null,
          coverPhotos: () => null,
          spaceCoverPhotos: () => null,
          pageCoverPhotos: () => null,
          PhotoResponse: () => null
        },
        resolvers: { // changes what is returned by queries/mutations
          Query: {
            posts: cursorPagination('post'),
            comments: cursorPagination('comment'),
            offers: cursorPagination('offer')
          }
        },
        updates: {   // changes what is cached after queries/mutations are run
          Mutation: {
            deletePost: (_result, args: DeletePostMutationVariables, cache, _info) => {
              cache.invalidate({
                __typename: 'Post',
                id: args.id
              })
            },
            deleteComment: (_result, args: DeleteCommentMutationVariables, cache, _info) => {
              cache.invalidate({
                __typename: 'Comment',
                id: args.id
              })
            },
            deleteOffer: (_result, args: DeleteOfferMutationVariables, cache, _info) => {
              cache.invalidate({
                __typename: 'Offer',
                id: args.id
              })
            },
            deletePage: (_result, args: DeletePageMutationVariables, cache, _info) => {
              cache.invalidate({
                __typename: 'Page',
                id: args.id
              })
            },
            deleteSpace: (_result, args: DeleteSpaceMutationVariables, cache, _info) => {
              cache.invalidate({
                __typename: 'Space',
                id: args.id
              })
            },
            createPage: (_result, _args, cache, _info) => {
              invalidateAll(cache, 'page')
            },
            updateComment: (_result, _args, cache, _info) => {
              invalidateAll(cache, 'comment')
            },
            createComment: (_result, _args, cache, _info) => {
              invalidateAll(cache, 'comment')
            },
            voteComment: (_result, args: VoteCommentMutationVariables, cache, _info) => {
              const { commentId, value } = args

              const data = cache.readFragment(
                gql`
                  fragment _ on Comment {
                    points
                    voteStatus
                  }
                `,
                { id: commentId }
              )
              const { points, voteStatus } = data
              if (data) {
                if (value != voteStatus) {
                  let valueToAdd
                  if (voteStatus == null) {
                    valueToAdd = value
                  }
                  else {
                    valueToAdd = value == -1 ? -2 : 2
                  }
                  const newPoints = points + valueToAdd
                  cache.writeFragment(
                    gql`
                      fragment _ on Comment {
                        points  
                        voteStatus
                      }
                    `,
                    { id: commentId, points: newPoints, voteStatus: value }
                  )
                }
                else {
                  cache.writeFragment(
                    gql`
                      fragment _ on Comment {
                        points  
                        voteStatus
                      }
                    `,
                    { id: commentId, points: points + (value == 1 ? -1 : 1), voteStatus: null }
                  )
                }
              }
            },
            vote: (_result, args: VoteMutationVariables, cache, _info) => {
              const { postId, value } = args

              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    points
                    voteStatus
                  }
                `,
                { id: postId }
              )
              const { points, voteStatus } = data
              if (data) {
                if (value != voteStatus) {
                  let valueToAdd
                  if (voteStatus == null) {
                    valueToAdd = value
                  }
                  else {
                    valueToAdd = value == -1 ? -2 : 2
                  }
                  const newPoints = points + valueToAdd
                  cache.writeFragment(
                    gql`
                      fragment _ on Post {
                        points  
                        voteStatus
                      }
                    `,
                    { id: postId, points: newPoints, voteStatus: value }
                  )
                }
                else {
                  cache.writeFragment(
                    gql`
                      fragment _ on Post {
                        points  
                        voteStatus
                      }
                    `,
                    { id: postId, points: points + (value == 1 ? -1 : 1), voteStatus: null }
                  )
                }
              }
            },
            createPost: (_result, _args, cache, _info) => {
              invalidateAll(cache, 'post')
            },
            createOffer: (_result, _args, cache, _info) => {
              invalidateAll(cache, 'offer')
            },
            uploadAvatar: (_result, _args, cache, _info) => {
              invalidateAll(cache, 'avatar')
            },
            changeAvatar: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'me')
              const fields = cache.inspectFields('Query')
              const potentials = fields.filter(f => f.fieldName == 'getSignedUrl')
              potentials.forEach(p => {
                if (p.fieldKey.includes('photos/avatars') && p.fieldKey.includes('users')) {
                  cache.invalidate('Query', p.fieldName, p.arguments)
                }
              })
            },
            uploadSpaceAvatar: (_result, _args, cache, _info) => {
              invalidateAll(cache, 'spaceAvatar')
            },
            uploadPageAvatar: (_result, _args, cache, _info) => {
              invalidateAll(cache, 'pageAvatar')
            },
            uploadCoverPhoto: (_result, _args, cache, _info) => {
              invalidateAll(cache, 'coverPhoto')
            },
            uploadSpaceCoverPhoto: (_result, _args, cache, _info) => {
              invalidateAll(cache, 'spaceCoverPhoto')
            },
            uploadPageCoverPhoto: (_result, _args, cache, _info) => {
              invalidateAll(cache, 'pageCoverPhoto')
            },
            subscribe: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'subscriptionStatus')
            },
            unsubscribe: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'subscriptionStatus')
            },
            follow: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'followStatus')
            },
            unfollow: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'followStatus')
            },
            followUser: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'userFollowStatus')
            },
            unfollowUser: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'userFollowStatus')
            },
            login: (result: LoginMutation, _args, cache, _info) => {
              invalidateAll(cache, 'post')
              invalidateAll(cache, 'offer')
              cache.updateQuery({ query: MeDocument }, (data: MeQuery) => {
                if (result.login.errors) {
                  return data
                }
                else {
                  return {
                    me: result.login.user
                  }
                }
              })
            },
            register: (result: RegisterMutation, _args, cache, _info) => {
              cache.updateQuery({ query: MeDocument }, (data: MeQuery) => {
                if (result.register.errors) {
                  return data
                }
                else {
                  return {
                    me: result.register.user
                  }
                }
              })
            },
            logout: (_result, _args, cache, _info) => {
              invalidateAll(cache, 'post')
              invalidateAll(cache, 'offer')
              invalidateAll(cache, 'myPage')
              invalidateAll(cache, 'mySpace')
              invalidateSingle(cache, 'me')
            },
            triggerPostsInvalidate: (_result, _args, cache, _info) => {
              invalidateAll(cache, 'post')
            },
            triggerOffersInvalidate: (_result, _args, cache, _info) => {
              invalidateAll(cache, 'offer')
            },
            updateInfo: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'user')
            },
            updatePageInfo: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'page')
            },
            updateSpaceInfo: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'space')
            },
            createEducationItem: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'educationItems')
            },
            updateEducationItem: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'educationItems')
            },
            deleteEducationItem: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'educationItems')
            },
            createExperience: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'experiences')
            },
            updateExperience: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'experiences')
            },
            deleteExperience: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'experiences')
            },
            createQualification: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'qualifications')
            },
            updateQualification: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'qualifications')
            },
            deleteQualification: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'qualifications')
            },
            setSkills: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'user')
            },
            uploadCV: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'cvs')
            },
            deleteCV: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'cvs')
            },
            apply: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'offer')
            },
            deleteOfferApplication: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'offer')
            },
            updateApplicationStatus: (_result, _args, cache, _info) => {
              invalidateSingle(cache, 'offer')
            }
          }
        }
      }),
      errorExchange,
      ssrExchange,
      multipartFetchExchange // use this instead of fetchExchange to support file uploading
    ]
  }
}
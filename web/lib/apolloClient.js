import { ApolloClient, ApolloLink, HttpLink, InMemoryCache /*, fromPromise */ } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { onError } from '@apollo/link-error'
import { getMainDefinition } from 'apollo-utilities'
import fetch from 'isomorphic-unfetch'

const STATUS_BAD_REQUEST = 400
const STATUS_UNAUTHORIZED = 401

/**
* Instantiate the Apollo client
 * @returns {Object} a new Apollo Client instance
 */
export default function createApolloClient () {
  // Config
  let graphqlUrl
  const ssrMode = typeof window === 'undefined'

  /* eslint-disable prefer-destructuring */
  if (process.browser) {
    graphqlUrl = 'localhost:3001/graphql'
  } else {
    graphqlUrl = 'localhost:3001/graphql'
  }

  const httpLink = new HttpLink({ uri: `http://${graphqlUrl}`, credentials: 'same-origin', fetch })
  // const wsLink = ssrMode ? null : new WebSocketLink({ uri: `ws://${graphqlUrl}`, options: { reconnect: true } })
  // error handling for Apollo Link
  const errorLink = onError((apolloError) => {
    const { graphQLErrors, networkError, operation /*, forward */ } = apolloError

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        // eslint-disable-next-line no-console
        console.error(`[GraphQL error]: ${message}`, {
          locations,
          operationName: operation && operation.operationName,
          path
        })
      })
    }

    if (networkError) {
      const errorCode = networkError.response && networkError.response.status
      if (errorCode === STATUS_UNAUTHORIZED) {
        // If a 401 Unauthorized error occurred, silently refresh the token from /refresh.
        // This will re-authenticate the user without showing a login page and a new token is issued.
        /*
        let pendingRequestsQueue
        if (!isRefreshing) {
          isRefreshing = true
          pendingRequestsQueue = fromPromise(getNewToken()
          // eslint-disable-next-line promise/always-return
            .then(({ accessToken }) => {
              setAccessToken(accessToken)
              resolvePendingRequests()
            })
            .catch((error) => {
              pendingRequests = []
              setAccessToken()
              // eslint-disable-next-line no-console
              console.error(error)
            })
            .finally(() => {
              isRefreshing = false
            }))
        } else {
          // We already have a pending refresh, therefore add the request to the queue
          // The request will be resolved after the token refresh finished and all previous requests resolved.
          pendingRequestsQueue = fromPromise(new Promise((resolve) => {
            pendingRequests.push(() => resolve())
          }))
        }

        return pendingRequestsQueue.flatMap(() => forward(operation))
        */
      }
      if (errorCode !== STATUS_BAD_REQUEST) {
        // eslint-disable-next-line no-console
        console.error(`Unable to access the GraphQL API. Is it running and accessible at ${graphqlUrl} from the server?`)
      }
    }

    // Default
    return null
  })

  // Set auth context
  // https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-context
  /*
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      ...(token ? { Authorization: token } : {})
    }
  }))
  */
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: false,
    link: ApolloLink.from([errorLink, httpLink]),
    /*
    ApolloLink.from(ssrMode ? [errorLink, httpLink] : [errorLink, ApolloLink.split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      httpLink
    )]), */
    cache: new InMemoryCache({
      typePolicies: {
      }
    })
  })
}

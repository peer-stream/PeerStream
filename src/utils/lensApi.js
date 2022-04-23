import { urqlClient } from './urql-client';

const pingQuery = `
  query {
    ping
  }
`

export const queryExample = async () => {
  const response = await urqlClient.query(pingQuery).toPromise();
  console.log('Lens example data: ', response)
}

const GET_PING = `
  query {
    ping
  }
`

export const ping = () => {
   return apolloClient.query({
    query: gql(GET_PING),
  })
}

import { apolloClient } from './apollo-client';
// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { gql } from '@apollo/client'

const GET_USERS_NFTS = `
  query($request: NFTsRequest!) {
    nfts(request: $request) {
      items {
        contractName
        contractAddress
        symbol
        tokenId
        owners {
          amount
          address
        }
        name
        description
        contentURI
        originalContent {
          uri
          metaType
        }
        chainId
        collectionName
        ercType
      }
    pageInfo {
        prev
        next
        totalCount
    }
  }
}
`

export const getUsersNfts = (ownerAddress, contractAddress, chainIds) => {
   return apolloClient.query({
    query: gql(GET_USERS_NFTS),
    variables: {
      request: {
        ownerAddress,
        contractAddress,
        chainIds,
        limit: 10
      }
    },
  })
}
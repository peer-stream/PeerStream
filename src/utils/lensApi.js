
import { apolloClient
    
} from './apolloClient';
import { gql } from '@apollo/client'

import { createClient } from 'urql'

const APIURL = 'https://api-mumbai.lens.dev/';


   

const GET_PING = `
  query {
    ping
  }
`

export const ping = async() => {
   return await apolloClient.query({
    query: gql(GET_PING),
  });
}
   

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

export const getUsersNfts = async(ownerAddress, contractAddress, chainIds) => {
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
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
export const GetNFT = () => {
    return apolloClient.query({
     query: gql(GET_USERS_NFTS),
   })
}
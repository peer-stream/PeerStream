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
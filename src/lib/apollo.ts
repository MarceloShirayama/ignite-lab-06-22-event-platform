import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4o20wez06nq01z24vzif3nd/master',
  cache: new InMemoryCache()
})

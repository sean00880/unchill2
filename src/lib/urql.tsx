// v3Urql.js
import { createClient, gql } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';

const GRAPH_API_URL = "https://gateway.thegraph.com/api/a8b43e2518505948a332682bde7afcbc/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV";

export const client = createClient({
  url: GRAPH_API_URL,
  exchanges: [cacheExchange, fetchExchange],
});

// Updated query to fetch position data with liquidity, tickLower, and tickUpper
export const POSITION_QUERY = gql`
  query getPositions($pool_id: ID!, $num_skip: Int!) {
    pool(id: $pool_id) {
      id
      liquidity
      sqrtPrice
      token0 {
        symbol
        id
        decimals
      }
      token1 {
        symbol
        id
        decimals
      }
      feeTier
    }
    positions(skip: $num_skip, where: { pool: $pool_id }) {
      id
      tickLower {
        tickIdx
      }
      tickUpper {
        tickIdx
      }
      liquidity
    }
  }
`;

export default client;

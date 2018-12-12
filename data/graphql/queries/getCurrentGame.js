import gql from "graphql-tag";

// need to append @client to query

export default gql`
  query {
    currentGame @client {
      teamAScore
    }
  }
`;

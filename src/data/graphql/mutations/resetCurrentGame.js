import gql from "graphql-tag";

export default gql`
  mutation {
    resetCurrentGamee @client {
      teamAScore
      teamBScore
      teamAName
      teamBName
    }
  }
`;

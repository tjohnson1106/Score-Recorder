import React from "react";
import ReactDOM from "react-dom";
import "tachyons";

import { InMemoryCache, ApolloClient, HttpLink } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";
import gql from "graphql-tag";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
import App from "./App";
import NewGame from "./components/NewGame";

const cache = new InMemoryCache();

const defaultState = {
  currentGame: {
    __typename: "CurrentGame",
    teamAScore: 0,
    teamBScore: 0,
    teamAName: "Team A",
    teamBName: "Team B"
  }
};

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      resetCurrentGame: (_, __, { cache }) => {
        cache.writeData({ defaultState });
      },
      updateGame: (_, { index, value }, { cache }) => {
        const query = gql`
          query GetCurrentGame {
            currentGame @client {
              __typename
              teamAScore
              teamBScore
              teamAName
              teamBName
            }
          }
        `;

        // get state from reading the cached query

        const previousState = cache.readQuery({ query });

        const data = {
          ...previousState,
          currentGame: {
            ...previousState.currentGame,
            [index]: value
          }
        };

        cache.writeData({
          query,
          data
        });
      }
    }
  }
});

// using ApolloLink statelink and the graph.cool API
// ^must be specified in an array then call cache after array

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: "https://api.graph.cool/simple/v1/cjbl0bxmq04570186hqlvgpmg"
    })
  ]),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/new-game" component={NewGame} />
      </div>
    </Router>
  </ApolloProvider>,

  document.getElementById("root")
);

serviceWorker.unregister();

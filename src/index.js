import React from "react";
import ReactDOM from "react-dom";
import { InMemoryCache, ApolloClient, HttpLink } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "tachyons";

import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import NewScore from "./components/NewScore";

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.graph.cool/simple/v1/cjbl0bxmq04570186hqlvgpmg"
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Route exact path="/" component={App} />
      <Route exact path="/new-score" component={NewScore} />
    </Router>
  </ApolloProvider>,

  <App />,

  document.getElementById("root")
);

serviceWorker.unregister();

import React from "react";
import { allGames } from "../data/graphql/queries/allGames";
import graphql from "react-apollo";

const App = () => <div className="pa4">New Game</div>;

export default graphql(allGames)(App);

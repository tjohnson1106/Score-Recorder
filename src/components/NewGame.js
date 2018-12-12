import React, { Component } from "react";
import { compose, graphql } from "react-apollo";

import TeamCard from "./TeamCard";
import getCurrentGame from "../data/graphql/queries/getCurrentGame";
import updateGame from "../data/graphql/mutations/updateGame";

class NewGame extends Component {
  state = {};
  render() {
    const {
      updateGame,
      currentGame: { teamAScore, teamBScore, teamAName, teamBName }
    } = this.props;
    return (
      <div className="pa4 flex flex-column items-center">
        <div className="flex justify-center">
          <TeamCard
            name={teamAName}
            onChangeName={e => console.log(e.target.value)}
            goals={teamAScore}
            onGoal={() =>
              updateGame({
                variables: {
                  index: "teamAScore",
                  value: parseInt(teamAScore) + 1
                }
              })
            }
          />
          <TeamCard
            name={teamBName}
            onChangeName={e => console.log(e.target.value)}
            goals={teamBScore}
            onGoal={() =>
              updateGame({
                variables: {
                  index: "teamBScore",
                  value: parseInt(teamBScore) + 1
                }
              })
            }
          />
        </div>

        <button className="bn f6 link dim br2 ph3 pv2 mb2 dib white bg-green no-outline">
          Game Finished
        </button>
      </div>
    );
  }
}

export default compose(
  graphql(updateGame, { name: "updateGame" }),
  graphql(getCurrentGame, {
    props: ({ data: { currentGame } }) => ({
      currentGame
    })
  })
)(NewGame);

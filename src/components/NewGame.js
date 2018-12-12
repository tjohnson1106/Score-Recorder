import React, { Component } from "react";
import { compose, graphql } from "react-apollo";

import TeamCard from "./TeamCard";
import getCurrentGame from "../../data/graphql/queries/getCurrentGame";

class NewGame extends Component {
  state = {};
  render() {
    const { currentGame } = this.props;
    return (
      <div className="pa4 flex flex-column items-center">
        <div className="flex justify-center">
          {console.log("current-game", currentGame, "current-game")}
          <TeamCard
            name="Team A"
            onChangeName={e => console.log(e.target.value)}
            goals={0}
            onGoal={() => console.log("Goal")}
          />
          <TeamCard
            name="Team B"
            onChangeName={e => console.log(e.target.value)}
            goals={0}
            onGoal={() => console.log("Goal")}
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
  graphql(getCurrentGame, {
    props: ({ data: { currentGame } }) => ({
      currentGame
    })
  })
)(NewGame);

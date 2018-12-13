import React, { Component } from "react";
import { compose, graphql } from "react-apollo";

import TeamCard from "./TeamCard";
import { Success, Error } from "../global/Alerts";
import getCurrentGame from "../data/graphql/queries/getCurrentGame";
import updateGame from "../data/graphql/mutations/updateGame";
import createGame from "../data/graphql/mutations/createGame";

class NewGame extends Component {
  state = {
    created: false,
    error: false
  };

  createGame = async () => {
    const { createGame, currentGame } = this.props;

    try {
      await createGame({
        variables: {
          ...currentGame
        }
      });
      this.setState({ created: true });
    } catch (error) {
      this.setState({
        error: true
      });
    }
  };

  render() {
    const {
      updateGame,
      currentGame: { teamAScore, teamBScore, teamAName, teamBName }
    } = this.props;

    const { error, success } = this.state;
    return (
      <div className="pa4 flex flex-column items-center">
        {error && <Error />}
        {success && <Success />}
        <div className="flex justify-center">
          <TeamCard
            name={teamAName}
            onChangeName={e =>
              updateGame({
                variables: {
                  index: "teamAName",
                  value: e.target.value
                }
              })
            }
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
            onChangeName={e =>
              updateGame({
                variables: {
                  index: "teamBName",
                  value: e.target.value
                }
              })
            }
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

        <button
          onClick={this.createGame}
          className="bn f6 link dim br2 ph3 pv2 mb2 dib white bg-green no-outline"
        >
          Game Finished
        </button>
      </div>
    );
  }
}

export default compose(
  graphql(updateGame, { name: "updateGame" }),
  graphql(createGame, { name: "createGame" }),
  graphql(getCurrentGame, {
    props: ({ data: { currentGame } }) => ({
      currentGame
    })
  })
)(NewGame);

import React from "react";
import TeamCard from "./TeamCard";
import { graphql } from "apollo-client";
import { compose } from "react-apollo";

const NewGame = () => (
  <div className="pa4 flex flex-column items-center">
    <div className="flex justify-center">
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
export default NewGame;

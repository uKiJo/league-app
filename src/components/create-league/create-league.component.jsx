import React from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isCreatedState } from "../../recoil/atoms/userState.atom";
import Fixture from "../fixture/fixture.component";
import LeagueSettings from "../league-settings/league-settings.component";

import "./create-league.styles.scss";

const CreateLeague = ({ currentUser }) => {
  const setIsCreated = useSetRecoilState(isCreatedState);
  setIsCreated(false);

  return (
    <>
      <div className="create">
        <LeagueSettings currentUser={currentUser} />
        <Fixture isCreate />
      </div>
    </>
  );
};

export default CreateLeague;

import React, { useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { addFixture, addTable } from "../../firebase/firebase";
import {
  fixtureState,
  myLeaguesState,
  tableState,
  teamsState,
} from "../../recoil/atoms/teams.atom";
import { isCreatedState } from "../../recoil/atoms/userState.atom";
import { generateFirstDay } from "../../recoil/utils/utils";

import sprite from "./sprite.svg";

import "./league-settings.styles.scss";
import MyLeagues from "../my-leagues/my-leagues.component";
import { useEffect } from "react/cjs/react.development";
import { useNavigate } from "react-router-dom";

const LeagueSettings = ({ currentUser }) => {
  const setFixture = useSetRecoilState(fixtureState);
  const fixture = useRecoilValue(fixtureState);
  const teams = useRecoilValue(teamsState);
  // const user = useRecoilValue(userState);
  const [generate, setGenerate] = useState("Generate");
  const [leagueName, setLeagueName] = useState("");
  const [isExist, setIsExist] = useState(false);
  const myLeagues = useRecoilValue(myLeaguesState);
  const [isCreated, setIsCreated] = useRecoilState(isCreatedState);

  let navigate = useNavigate();

  const queryClient = useQueryClient();
  
  const mutation = useMutation(({ data, name }) =>
    addFixture(currentUser, data, name),
    {
      onSuccess: (data) => {
        // queryClient.invalidateQueries('leagues');
        queryClient.invalidateQueries(['leagues'], data)
      },
    }
  );
  const tableMutation = useMutation((data) => addTable(currentUser, data));

  

  const handleChange = ({ target: { value } }) => {
    setLeagueName(value);
  };

  const handleMutate = () => {
    mutation.mutate({ data: fixture, name: leagueName });
    const existing = myLeagues.includes(leagueName);
    console.log(existing)

    if(!existing) {
      navigate(`/myleagues/${leagueName}`)
    }
  }

 
  const func = () => {
    const generatedFixture = generateFirstDay(teams);

    setFixture(generatedFixture);
    // setAnimate(true);
    setGenerate("Regenerate");
    // setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div
      className={`${
        mutation.isSuccess && isExist ? "hide-setting-box" : "settings-box"
      }`}
    >
      <div className="league-name-input">
        <h4 className="title">League name</h4>
        <input
          className={`${isExist ? "bounce" : ""}`}
          type="text"
          value={leagueName}
          onChange={handleChange}
        />
        <svg className="pencil-icon">
          <use href={sprite + "#icon-pencil"} />
        </svg>
      </div>
      <div className="buttons">
        <button className="generate-button" onClick={func}>
          {generate}
        </button>
        <div className="save">
          {mutation.isLoading ? (
            <h2>what...</h2>
          ) : (
            <>
              {mutation.isError ? (
                <div>An error occurred: {mutation.error.message}</div>
              ) : null}

              <button
                className="generate-button"
                onClick={handleMutate}
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// () => {
//   // tableMutation.mutate(table);
// }

export default LeagueSettings;

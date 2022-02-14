import React, { useState, useEffect } from "react";

import { useQueryClient, useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  fetchData,
  addFixture,
  addTable,
  fetchLeague,
} from "../../firebase/firebase";
import {
  fixtureState,
  teamsState,
  tableState,
} from "../../recoil/atoms/teams.atom";

import Game from "../game/game.component";
import { SpinnerContainer } from "../loading-hoc/loading-hoc.styles";

import toast, { Toaster } from 'react-hot-toast';

import "./fixture.styles.scss";

const Fixture = ({ currentUser, isCreate }) => {
  // const fixture = useRecoilValue(fixtureState);
  const [teams, setTeams] = useRecoilState(teamsState);
  const [generate, setGenerate] = useState("Generate");
  const [animate, setAnimate] = useState(null);
  const table = useRecoilValue(tableState);

  const errorAlert = () => toast.error('Something weng wrong, please try again.', {duration: 5000});

  useEffect(() => {
    errorAlert();
  })

  const [fixture, setFixture] = useRecoilState(fixtureState);

  const param = useParams();
  const route = param.leagueId;

  const isAutoFetching = !isCreate;

  

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["league", currentUser, param.leagueId],
    () => fetchLeague(currentUser, route),
    { refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: isAutoFetching }
  );

  if(!isCreate) {
    if (isLoading) return <div className="spinner-container"><SpinnerContainer width='50px' /></div> 
    if (isError) return <Toaster />
    
    setFixture(data);
  }
  

  

  console.log("fixture rendered");

  return (
    <div className="container">
      <div className="bg">
        <div className={`${animate ? "animate" : ""} fixture`}>
          {fixture.map((day) => (
            <div key={fixture.indexOf(day)} className="day">
              <h1>Day {fixture.indexOf(day) + 1}</h1>
              {day.map((game) => (
                <Game currentUser={currentUser} key={game.id} game={game} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fixture;

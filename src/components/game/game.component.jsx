import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

import { useRecoilState } from "recoil";
import { updateFix } from "../../firebase/firebase";

import { fixtureState, tableState } from "../../recoil/atoms/teams.atom";

import "./game.styles.scss";

const { updateFixture, updateTable, getDayidx } = require('./update');
const { FixtureParamaters } = require('./data');


const Game = ({ game, currentUser }) => {

  const param = useParams();
  const route = param.leagueId;

  const queryClient = useQueryClient();

  const [fixture, setFixture] = useRecoilState(fixtureState);
  const [table, setTable] = useRecoilState(tableState);

  const homeGoal = game.homeTeam.goal;
  const awayGoal = game.awayTeam.goal;

  const mutation = useMutation(({ data, dayIdx, route }) =>
    updateFix(currentUser, data, dayIdx, route)
  );

  const { homeTeam, awayTeam } = game;
  const dayIdx = getDayidx(fixture, game);

  

  const handleHomeScore = ({ target: { value } }) => {

    const type = "homeTeam";

    const fixtureData = new FixtureParamaters(fixture, game, value, homeTeam, type);
    if (!isNaN(value)) {
    
      const updateSelectedDay = updateFixture(fixtureData);

      //mutate the cache directly so no unnecessary fetching query are made.
      queryClient.setQueryData(
        ["league", currentUser, route],
        updateSelectedDay
      ); 
      
      setFixture(updateSelectedDay);
    
      // if the away input field exist, mutate!
      if ((awayGoal || awayGoal === '') && (!isNaN(value)  || value === '')) {
       
        mutation.mutate({
          data: updateSelectedDay[dayIdx],
          dayIdx: dayIdx,
          route: route,
        }); //mutate the database only if both score input are filled (to minimize data requests!!)
      }
      
    }

    const update = updateTable(fixture, table, value, game, awayGoal, type);
    setTable(update);
  };

  const handleAwayScore = ({ target: { value } }) => {

    const type = "awayTeam";

    const fixtureData = new FixtureParamaters(fixture, game, value, awayTeam, type);
    if (!isNaN(value)) {

      var updateSelectedDay = updateFixture(fixtureData);

      //mutate the cache directly so no unnecessary fetching query are made.
      queryClient.setQueryData(
        ["league", currentUser, route],
        updateSelectedDay
      ); 
      
      setFixture(updateSelectedDay);

      if ((homeGoal || homeGoal === '') && (!isNaN(value) || value === '')) {

        mutation.mutate({
          data: updateSelectedDay[dayIdx],
          dayIdx: dayIdx,
          route: route,
        });
      } 
    }

    const update = updateTable(
      updateSelectedDay,
      table,
      value,
      game,
      homeGoal,
      type
    );

    setTable(update);
  };

  return (
    <div className="game">
      <div className="game-detail">
        <div className="home-team-details">
          <span> {homeTeam.name} </span>
          <img
            className="img"
            src={homeTeam.logo_path}
            alt={`${homeTeam.short_code}`}
          />
        </div>
        <div className="score">
          <input
            className="goal-input"
            type="text"
            defaultValue={homeGoal}
            onChange={handleHomeScore}
            maxLength="2"
          />
          <span className="separator">-</span>
          <input
            className="goal-input"
            type="text"
            defaultValue={awayGoal}
            onChange={handleAwayScore}
            maxLength="2"
          />
        </div>

        <div className="away-team-details">
          <img
            className="img"
            src={awayTeam.logo_path}
            alt={`${awayTeam.short_code}`}
          />
          <span> {awayTeam.name} </span>
        </div>
      </div>
    </div>
  );
};

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export default Game;

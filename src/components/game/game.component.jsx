import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { updateFix } from "../../firebase/firebase";

import { fixtureState, tableState } from "../../recoil/atoms/teams.atom";

import "./game.styles.scss";
import { updateFixture, updateTable } from "./update";

const Game = ({ game, currentUser }) => {
  const param = useParams();
  const route = param.leagueId;

  const homeGoal = game.homeTeam.goal;
  const awayGoal = game.awayTeam.goal;

  const queryClient = useQueryClient();

  const mutation = useMutation(({ data, dayIdx, route }) =>
    updateFix(currentUser, data, dayIdx, route)
  );

  const { id, homeTeam, awayTeam } = game;

  const [fixture, setFixture] = useRecoilState(fixtureState);

  const [table, setTable] = useRecoilState(tableState);

  let int = fixture.map((day) => day.findIndex((dayGame) => dayGame.id === id));

  const dayIdx = int.findIndex((e) => e !== -1);
  const gameIdx = int.find((e) => e !== -1);

  const handleHomeScore = ({ target: { value } }) => {
    const type = "homeTeam";
    if (!isNaN(value)) {
      console.log(fixture[0])
      // const number = parseInt(value)
      const updateSelectedDay = updateFixture(
        fixture,
        dayIdx,
        gameIdx,
        value,
        homeTeam,
        type
      );

      var awayGoal = updateSelectedDay[dayIdx][gameIdx].awayTeam.goal;
      console.log(awayGoal)
      
      console.log(updateSelectedDay)
      setFixture(updateSelectedDay);
    
      // if the away input field exist, mutate!
      if ((awayGoal || awayGoal === '') && (value || value === '')) {
       
        queryClient.setQueryData(
          ["league", currentUser, route],
          updateSelectedDay
        ); //mutate the cache directly so no unnecessary fetching query are made.
          
        mutation.mutate({
          data: updateSelectedDay[dayIdx],
          dayIdx: dayIdx,
          route: route,
        }); //mutate the database
      }
      
    }

    const update = updateTable(fixture, table, value, game, awayGoal, type);
    setTable(update);
  };

  const handleAwayScore = ({ target: { value } }) => {
    console.log(fixture[0][9])
    const type = "awayTeam";
    if (!isNaN(value)) {
      // const number = parseInt(value);
      var updateSelectedDay = updateFixture(
        fixture,
        dayIdx,
        gameIdx,
        value,
        awayTeam,
        type
      );

      const homeGoal = fixture[dayIdx][gameIdx].homeTeam.goal;
      console.log(homeGoal)
      
      setFixture(updateSelectedDay);

      if ((homeGoal || homeGoal === '') && (value || value === '')) {
        queryClient.setQueryData(
          ["league", currentUser, route],
          updateSelectedDay
        ); //mutate the cache directly so no unnecessary fetching query are made.

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

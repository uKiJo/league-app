import React, { useState, useEffect } from "react";

import { useRecoilState, useRecoilValue } from "recoil";

import {
  fixtureState,
  tableState,
  teamsState,
} from "../../recoil/atoms/teams.atom";

import "./game.styles.scss";

const Game = ({ game }) => {
  const { id, homeTeam, awayTeam } = game;

  

  const [fixture, setFixture] = useRecoilState(fixtureState);

  const [table, setTable] = useRecoilState(tableState);

  let int = fixture.map((day) => day.findIndex((dayGame) => dayGame.id === id));

  const dayIdx = int.findIndex((e) => e !== -1);
  const gameIdx = int.find((e) => e !== -1);

  const homeTeamIdx = table.findIndex((team) => team.name === homeTeam.name);
  const awayTeamIdx = table.findIndex((team) => team.name === awayTeam.name);

  const hometeamGoal = fixture[dayIdx][gameIdx].homeTeam.goal;
  const awayteamGoal = fixture[dayIdx][gameIdx].awayTeam.goal;

  const handleHomeScore = ({ target: { value } }) => {
    if (!isNaN(value)) {
      const number = parseInt(value);

      
      console.log('day: ', dayIdx, 'game: ', gameIdx)
      const selectedGame = fixture[dayIdx][gameIdx];
      const selectedDay = fixture[dayIdx];
      console.log(selectedGame);
      console.log(selectedDay);

      const updateSelectedGame = replaceItemAtIndex(selectedDay, gameIdx, {
        ...selectedGame,
        homeTeam: {
          ...homeTeam,
          goal: value,
        }
      } )

      const updateSelectedDay = replaceItemAtIndex(fixture, dayIdx, updateSelectedGame);


      setFixture(updateSelectedDay);
      

      console.log(updateSelectedGame)
    }

    

    const reducer = (previousValue, currentValue) =>
        previousValue + currentValue;

    if (value && awayteamGoal) {
       //reducer function

      const pointsArrh = table[homeTeamIdx].pointsArr;
      console.log(pointsArrh);
      const pointsh = replaceItemAtIndex(
        pointsArrh,
        dayIdx,
        value > awayteamGoal ? 3 : value < awayteamGoal ? 0 : 1
      );
       

      const updateHome = replaceItemAtIndex(table, homeTeamIdx, {
        ...table[homeTeamIdx],
        pointsArr: pointsh,
        point: pointsh.filter((e) => e).reduce(reducer, 0),
      });

      const pointsArra = updateHome[awayTeamIdx].pointsArr;

      const pointsa =  replaceItemAtIndex(
        pointsArra,
        dayIdx,
        value > awayteamGoal ? 0 : value < awayteamGoal ? 3 : 1
      );
       

      const updateAway = replaceItemAtIndex(updateHome, awayTeamIdx, {
        ...updateHome[awayTeamIdx],
        pointsArr: pointsa,
        point: pointsa.filter((e) => e).reduce(reducer, 0),
      });

      const sortedTable = updateAway.sort((a, b) => b.point - a.point);

      setTable(sortedTable);
    } else {
      
      const pointsArrh = table[homeTeamIdx].pointsArr;
      console.log(pointsArrh);
      const pointsh = replaceItemAtIndex(
        pointsArrh,
        dayIdx,
        0
      );
       

      const updateHome = replaceItemAtIndex(table, homeTeamIdx, {
        ...table[homeTeamIdx],
        pointsArr: pointsh,
        point: pointsh.filter((e) => e).reduce(reducer, 0),
      });

      const pointsArra = updateHome[awayTeamIdx].pointsArr;

      const pointsa =  replaceItemAtIndex(
        pointsArra,
        dayIdx,
        0
      );
       

      const updateAway = replaceItemAtIndex(updateHome, awayTeamIdx, {
        ...updateHome[awayTeamIdx],
        pointsArr: pointsa,
        point: pointsa.filter((e) => e).reduce(reducer, 0),
      });

      const sortedTable = updateAway.sort((a, b) => b.point - a.point);

      setTable(sortedTable);
      }
    
  };

  const handleAwayScore = ({ target: { value } }) => {
    if (!isNaN(value)) {
      const number = parseInt(value);
      
      console.log('day: ', dayIdx, 'game: ', gameIdx)
      const selectedGame = fixture[dayIdx][gameIdx];
      const selectedDay = fixture[dayIdx];
      console.log(selectedGame);
      console.log(selectedDay);

      const updateSelectedGame = replaceItemAtIndex(selectedDay, gameIdx, {
        ...selectedGame,
        awayTeam: {
          ...awayTeam,
          goal: value,
        }
      } )

      const updateSelectedDay = replaceItemAtIndex(fixture, dayIdx, updateSelectedGame);


      setFixture(updateSelectedDay);
      
    }

    

    const reducer = (previousValue, currentValue) =>
        previousValue + currentValue; //reducer function

    if (hometeamGoal && value) {
      

      const pointsArrh = table[homeTeamIdx].pointsArr;
      console.log(pointsArrh);
      const pointsh = replaceItemAtIndex(
        pointsArrh,
        dayIdx,
        value < hometeamGoal ? 3 : value > hometeamGoal ? 0 : 1
      );

      const updateHome = replaceItemAtIndex(table, homeTeamIdx, {
        ...table[homeTeamIdx],
        pointsArr: pointsh,
        point: pointsh.filter((e) => e).reduce(reducer, 0),
      });

      const pointsArra = updateHome[awayTeamIdx].pointsArr;

      const pointsa = replaceItemAtIndex(
        pointsArra,
        dayIdx,
        value > hometeamGoal ? 3 : value < hometeamGoal ? 0 : 1
      );

      const updateAway = replaceItemAtIndex(updateHome, awayTeamIdx, {
        ...updateHome[awayTeamIdx],
        pointsArr: pointsa,
        point: pointsa.filter((e) => e).reduce(reducer, 0),
      });

      console.log(updateAway);

      const sortedTable = updateAway.sort((a, b) => b.point - a.point);

      setTable(sortedTable);
    } else {
      
      const pointsArrh = table[homeTeamIdx].pointsArr;
      console.log(pointsArrh);
      const pointsh = replaceItemAtIndex(
        pointsArrh,
        dayIdx,
        0
      );
       

      const updateHome = replaceItemAtIndex(table, homeTeamIdx, {
        ...table[homeTeamIdx],
        pointsArr: pointsh,
        point: pointsh.filter((e) => e).reduce(reducer, 0),
      });

      const pointsArra = updateHome[awayTeamIdx].pointsArr;

      const pointsa =  replaceItemAtIndex(
        pointsArra,
        dayIdx,
        0
      );
       

      const updateAway = replaceItemAtIndex(updateHome, awayTeamIdx, {
        ...updateHome[awayTeamIdx],
        pointsArr: pointsa,
        point: pointsa.filter((e) => e).reduce(reducer, 0),
      });

      const sortedTable = updateAway.sort((a, b) => b.point - a.point);

      setTable(sortedTable);
      }
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
            value={hometeamGoal}
            onChange={handleHomeScore}
            maxlength="2"
          />
          <span className="separator">-</span>
          <input
            className="goal-input"
            type="text"
            value={awayteamGoal}
            onChange={handleAwayScore}
            maxlength="2"
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

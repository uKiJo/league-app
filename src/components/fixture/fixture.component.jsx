import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fetchData } from "../../firebase/firebase";
import { fixtureState, teamsState, tableState } from "../../recoil/atoms/teams.atom";
import { generateFirstDay } from "../../recoil/utils/utils";

import Game from "../game/game.component";
import Table from "../table/table.component";

import "./fixture.styles.scss";

const Fixture = () => {
  const [fixture, setFixture] = useRecoilState(fixtureState);
  const [teams, setTeams] = useRecoilState(teamsState);
  const [table, setTable] = useRecoilState(tableState);
  
  const [animate, setAnimate] = useState(null);

  useEffect(() => {
    console.log('fixture component rendered', table);
    
  }, [table])

  const { data, isLoading, isError, isFetched } = useQuery("data", fetchData);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return alert("something went wrong!");
  if (isFetched && !table.length) {
    const tableData = data.teams;
    const standing = tableData.map(el => (
      {...el, point: 0, pointsArr: [], goal: 0}
    ))
    setTable(standing);} 
  // const teamsData = data.teams;

  setTeams(data.teams);
  
  
  



  const func = () => {
    const generatedFixture = generateFirstDay(teams);

    setFixture(generatedFixture);
    setAnimate(true);

    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div className="container">
      <Link to="/table">
        <button>table</button>
      </Link>
      <Table />
      <div className="bg">
        <div className={`${animate ? "animate" : ""} fixture`}>
          <button onClick={func}>generate</button>

          {fixture.map((day) => (
            <div key={fixture.indexOf(day)} className="day">
              {day.map((game) => (
                <Game key={game.id} game={game} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fixture;

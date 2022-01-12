import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchData } from "../../firebase/firebase";
import { fixtureState, teamsState } from "../../recoil/atoms/teams.atom";
import { generateFirstDay } from "../../recoil/utils/utils";

import Game from "../fixture/fixture.component.jsx";
import Table from "../table/table.component";

import "./fixture.styles.scss";

const Fixture = () => {
  const [fixture, setFixture] = useRecoilState(fixtureState);
  const [teams, setTeams] = useRecoilState(teamsState);
  const [animate, setAnimate] = useState(null);

  // const teams = useRecoilValue(teamsState);

  const { data, isLoading, isError } = useQuery("data", fetchData);
  if (isLoading) return <div>Loading</div>;
  if (isError) return alert("something went wrong!");

  // const teamsData = data.teams;

  setTeams(data.teams);
  console.log(teams);

  const func = () => {
    const generatedFixture = generateFirstDay(teams);

    setFixture(generatedFixture);
    setAnimate(true);

    setTimeout(() => setAnimate(false), 300);
  };

  console.log(fixture);
  return (
    <div className="container">
      <div className="bg">
        <div className={`${animate ? "animate" : ""} fixture`}>
          <button onClick={func}>generate</button>

          {fixture.map((day) => (
            <div key={fixture.indexOf(day)} className="day">
              {day.map((game) => (
                <Table key={day.indexOf(game)} game={game} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fixture;

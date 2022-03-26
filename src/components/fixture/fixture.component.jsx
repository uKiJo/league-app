import React, { useState, useEffect } from "react";

import { useQueryClient, useMutation, useQuery, useQueries } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  fetchData,
  addFixture,
  addTable,
  fetchLeague,
  fetchTable,
} from "../../firebase/firebase";
import {
  fixtureState,
  teamsState,
  tableState,
} from "../../recoil/atoms/teams.atom";

import Game from "../game/game.component";
import { SpinnerContainer } from "../loading-hoc/loading-hoc.styles";

import toast, { ToastBar, Toaster } from "react-hot-toast";

import "./fixture.styles.scss";

const Fixture = ({ currentUser, isCreate }) => {
  const [teams, setTeams] = useRecoilState(teamsState);
  const [generate, setGenerate] = useState("Generate");
  const [animate, setAnimate] = useState(null);
  const [table, setTable] = useRecoilState(tableState);

  console.log(currentUser);

  const errorAlert = () =>
    toast.error("Something weng wrong, please try again.", { duration: 5000 });

  const success = () =>
    toast.success("Fixture updated successfully", {
      duration: 5000,
      style: {
        fontSize: "15px",
        color: "red",
      },
    });

  const [fixture, setFixture] = useRecoilState(fixtureState);

  const param = useParams();
  const route = param.leagueId;

  const isAutoFetching = !isCreate;

  // const { tableData } = useQuery(["table", currentUser.uid], () =>
  //   fetchTable(currentUser, route)
  // );

  // const { data, isError, isLoading } = useQuery(
  //   ["league", currentUser?.uid, route],
  //   () => fetchLeague(currentUser, route),
  //   {
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //     enabled: isAutoFetching && !!currentUser,
  //   }
  // );

  const results = useQueries([
    {
      queryKey: ["league", currentUser.uid, route],
      queryFn: () => fetchLeague(currentUser, route),
    },
    {
      queryKey: ["table", currentUser.uid, route],
      queryFn: () => fetchTable(currentUser, route),
    }
    
  ]);

  const isLoading = results.some(result => result.isLoading);
  const isError = results.some(result => result.isError);
  const data = results.map(result => result.data);
  // const {table} = data[1];
  setTable(data[1].table)
  console.log(data[1].table);


  if (!isCreate) {
    if (isLoading)
      return (
        <div className="spinner-container">
          <SpinnerContainer width="50px" />
        </div>
      );
    if (isError) return <Toaster />;

    setFixture(data[0]);
  }

  // console.log(fixture);

  // console.log("fixture rendered");

  return (
    <div className="container">
      <div className="bg">
        <Toaster toastOptions={{ duration: 0 }} />
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

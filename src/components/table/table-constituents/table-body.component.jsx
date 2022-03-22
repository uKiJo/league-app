import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { fetchTable } from "../../../firebase/firebase";
import { tableState } from "../../../recoil/atoms/teams.atom";
import { SpinnerContainer } from "../../loading-hoc/loading-hoc.styles";

const TableBody = ({isMinified, currentUser}) => {

  const param = useParams();
  const route = param.leagueId;

  console.log(currentUser);
  console.log(route);

  const { data, isError, isLoading } = useQuery(['table', currentUser, route], () => fetchTable(currentUser, route))

  

  if(isLoading) return (
    <div className="spinner-container">
      <SpinnerContainer width="50px" />
    </div>
  );

  if(isError) return <h1>ERROR</h1>
  
  console.log(data)
  const {table} = data;

  return (
    <>
      {table.map((team) => (
          <tr key={team.id}>
            <th>{table.indexOf(team) + 1}</th>
            <th className={`${isMinified ? "reduce-font" : ""} name`}>
              {" "}
              <img src={team.logo_path} alt="logo" /> {team.name}{" "}
            </th>
            <th> {team.w + team.d + team.l} </th>
            <th className={`${isMinified ? "hide-prop" : ""}`}> {team.w} </th>
            <th className={`${isMinified ? "hide-prop" : ""}`}> {team.d} </th>
            <th className={`${isMinified ? "hide-prop" : ""}`}> {team.l} </th>
            <th className={`${isMinified ? "hide-prop" : ""}`}>
              {" "}
              {team.goals}{" "}
            </th>
            <th className={`${isMinified ? "hide-prop" : ""}`}> {team.ga}</th>
            <th> {team.goals - team.ga}</th>
            <th className="points"> {team.points} </th>
          </tr>
        ))}
    </>
  )
};

export default TableBody;

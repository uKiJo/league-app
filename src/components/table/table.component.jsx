import React from "react";

import { useRecoilValue } from "recoil";

import { tableState } from "../../recoil/atoms/teams.atom";


import "./table.styles.scss";

const Table = ({isMinified}) => {

  const table = useRecoilValue(tableState);

  

  return (
    <div className="table-content">
      <table>
      <tr>
        <th>Ranking</th>
        <th className="team">Team</th>
        <th>Played</th>
        <th className={`${isMinified ? 'hide-prop' : ''}`}>Won</th>
        <th className={`${isMinified ? 'hide-prop' : ''}`}>Drawn</th>
        <th className={`${isMinified ? 'hide-prop' : ''}`}>Lost</th>
        <th className={`${isMinified ? 'hide-prop' : ''}`}>GF</th>
        <th className={`${isMinified ? 'hide-prop' : ''}`}>GA</th>
        <th>GD</th>
        <th>Points</th>
      </tr>

      {table.map((team) => (
        <tr key={team.id}>
          <th>{table.indexOf(team) + 1}</th>
          <th className={`${isMinified ? 'reduce-font' : ''} name`}> <img src={team.logo_path} alt="logo" />   {team.name} </th>
          <th> {team.w + team.d + team.l} </th>
          <th className={`${isMinified ? 'hide-prop' : ''}`}> {team.w} </th>
          <th className={`${isMinified ? 'hide-prop' : ''}`}> {team.d} </th>
          <th className={`${isMinified ? 'hide-prop' : ''}`}> {team.l} </th>
          <th className={`${isMinified ? 'hide-prop' : ''}`}> {team.goals} </th>
          <th className={`${isMinified ? 'hide-prop' : ''}`}> {team.ga}</th>
          <th> {team.goals - team.ga}</th>
          <th className="points"> {team.points } </th>
        </tr>
      ))}
    </table>
    </div>
  );
};

export default Table;

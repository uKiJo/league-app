import React, {useEffect} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { tableState, teamsState } from "../../recoil/atoms/teams.atom";
import { tableStats } from "../../recoil/selectors/selec";

import "./table.styles.scss";

const Table = () => {
  // const clubs = useRecoilValue(tableState);
  const table = useRecoilValue(tableState);

  

  

  // const sorted = arrayForSort.sort((a, b) => a.point - b.point)

  

  useEffect(() => {
    console.log('table is rendered');
    console.log(table);
    
  }, [table])



  return (
    <table>
      <tr>
        <th>Ranking</th>
        <th>Team</th>
        <th>Points</th>
      </tr>

      {table.map((team) => (
        <tr>
          <th> <img src={team.logo_path} alt="" />   {team.name} </th>
         
          
          
          <th> {team.point !== 0 && team.point ? team.point : 0} </th>
          <th></th>
        </tr>
      ))}
    </table>
  );
};

export default Table;

import React from 'react';

const TableHeader = ({isMinified}) => {
  return (
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
  )
}

export default TableHeader;
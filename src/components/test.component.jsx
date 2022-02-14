import React from 'react';
import { useParams } from 'react-router-dom';

const Test = () => {

    let param = useParams()
  return <div>
      {param.leagueId}
  </div>;
};

export default Test;

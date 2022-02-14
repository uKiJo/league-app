import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import './league.styles.scss';

const League = ({name}) => {
  return (
    <div className='league-list-item'>
      <div className='league-name'>
        <h2> {name} </h2>
      </div>
      <Link to={`${name}`} className='list-button'>
        <button>Load</button>
      </Link>
      
    </div>
    
  )
};

export default League;

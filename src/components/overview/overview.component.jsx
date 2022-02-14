import React from 'react';

import Table from '../table/table.component';
import './overview.styles.scss';

const Overview = () => {
  return <div className='overview-content'>
      <div className='fixture'>
        <Table isMinified />
      </div>
      <div className='table'>21</div>
      <div className='stats'>Stats</div>
  </div>;
};

export default Overview;

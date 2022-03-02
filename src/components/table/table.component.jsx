import React from "react";

import TableBody from "./table-constituents/table-body.component";
import TableHeader from "./table-constituents/table-header.component";

import "./table.styles.scss";

const Table = ({ isMinified }) => {
  

  return (
    <div className="table-content">
      <table>
        <TableHeader isMinified={isMinified} />
        <TableBody isMinified={isMinified} />
      </table>
    </div>
  );
};

export default Table;

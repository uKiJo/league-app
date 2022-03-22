import React from "react";

import Fixture from "../../components/fixture/fixture.component";
import Header from "../../components/header/header.component";
import Overview from "../../components/overview/overview.component";
import Tab from "../../components/tab/tab.component";
import Table from "../../components/table/table.component";

import "./premier-league.styles.scss";

const PremierLeague = ({currentUser}) => {

  return (
    <div className="league-page">
      <Header currentUser={currentUser} />
      <div className="content">
        <Tab
          tabs={[
            { title: "overview", render: () => <Overview currentUser={currentUser} /> },
            { title: "table", render: () => <Table currentUser={currentUser} /> },
            { title: "fixture", render: () =>  <Fixture currentUser={currentUser} /> },
          ]}
        />
      </div>
    </div>
  );
};

export default PremierLeague;

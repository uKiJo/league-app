import React, { useState } from "react";

import { TabContainer, Title, TabButton, Indicator } from "./tab.styles";

const Tab = ({tabs}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <TabContainer>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            <Title active={activeTab === index}>{tab.title}</Title>
            <Indicator active={activeTab === index} />
          </TabButton>
        ))}
      </TabContainer>
      {tabs[activeTab].render()}
    </>
  );
};

export default Tab;

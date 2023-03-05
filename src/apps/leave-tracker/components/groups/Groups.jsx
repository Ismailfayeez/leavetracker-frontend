import React, { useState } from "react";
import TabItems from "../../../../ui-kit/tab-items/TabItems";
import AllGroups from "./all-groups/AllGroups";
import MyGroups from "./my-groups/MyGroups";

function Groups(props) {
  const [currentTab, setCurrentTab] = useState("myGroups");
  const tabItems = [
    {
      name: "myGroups",
      label: "My Groups",
    },
    {
      name: "allGroups",
      label: "All Groups",
    },
  ];
  return (
    <div className="groups page-layout">
      <header className="page-layout__header">
        <h3>Groups</h3>
      </header>
      <main className="page-layout__main">
        <TabItems
          items={tabItems}
          currentTab={currentTab}
          handleClick={({ name }) => setCurrentTab(name)}
        />
        <ul className="tabbed-list align-center mb-1">
          {tabItems.map((item) => (
            <li
              className={`tabbed-item ${
                item.name == currentTab ? "active" : ""
              }`}
            >
              {item.content}
            </li>
          ))}
        </ul>

        {/* {currentTab=="allGroups" */}
        {currentTab == "myGroups" && <MyGroups />}
        {currentTab == "allGroups" && <AllGroups />}
      </main>
    </div>
  );
}

export default Groups;

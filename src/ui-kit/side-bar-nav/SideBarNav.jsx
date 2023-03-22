import React from "react";
import AppNav from "../app-navigation/AppNav";
import "./sideBarNav.scss";
function SideBarNav({ appNavData = [] }) {
  return (
    <div className="side-bar-container">
      <div className="side-bar">
        <main className="side-bar__main">
          {appNavData.map((data) => (
            <AppNav key={data.header} appNavData={data} />
          ))}
        </main>
      </div>
    </div>
  );
}

export default SideBarNav;

import React from "react";
import AppNav from "../app-navigation/AppNav";
import "./sideBarNav.scss";
function SideBarNav({ appNavData = [] }) {
  return (
    <div className="side-bar-container">
      <div className="sidebar">
        <div className="sidebar-nav__content">
          {appNavData.map((data) => (
            <AppNav appNavData={data} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBarNav;

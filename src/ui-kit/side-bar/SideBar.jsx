import React from "react";
import AppNav from "../app-navigation/AppNav";
import { Link } from "react-router-dom";
import "./sideBar.scss";

function SideBar({ appNavData = [] }) {
  return (
    <div className="side-bar-container">
      <div className="sidebar">
        <div className="sidebar__content">
          {appNavData.map((data) => (
            <AppNav appNavData={data} />
          ))}
          <Link to="/playground">playground</Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;

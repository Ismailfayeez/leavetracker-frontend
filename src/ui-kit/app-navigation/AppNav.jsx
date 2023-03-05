import React from "react";
import { useLocation } from "react-router-dom";
import "./appNav.scss";
function AppNav({ appNavData }) {
  const location = useLocation();

  return (
    <div>
      <section className="app-nav">
        <header className="app-nav__header">{appNavData.header}</header>
        <ul className="list app-nav__list">
          {appNavData.navList.map((item) => (
            <li
              className={`app-nav__list-item ${
                location.pathname.startsWith("/" + item.path)
                  ? "app-nav__list-item--active"
                  : ""
              }`}
            >
              {appNavData.displayContent
                ? appNavData.displayContent(item)
                : item.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AppNav;

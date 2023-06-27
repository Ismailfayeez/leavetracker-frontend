import React from 'react';
import './sideBar.scss';
import Menu from '../menu/Menu';

function SideBar({ menuSectionList = [] }) {
  return (
    <div className="side-bar-container">
      <div className="side-bar">
        <div className="side-bar__content">
          {menuSectionList.map((menuSection) => (
            <Menu key={menuSection.header} menuSection={menuSection} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;

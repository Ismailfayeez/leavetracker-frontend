import React from "react";
import "./tabItems.scss";
function TabItems({ items, currentTab, handleClick = () => {} }) {
  return (
    <ul className="tab-items align-center mb-2">
      {items.map((item) => (
        <li
          onClick={() => handleClick({ ...item })}
          className={`tab-items__item ${
            item.name == currentTab ? "active" : ""
          }`}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export default TabItems;

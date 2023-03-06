import React from "react";
import { motion as m } from "framer-motion";
import "./tabItems.scss";
import { tabVariant } from "../../utilities/AnimateVariants";
function TabItems({ items, currentTab, handleClick = () => {} }) {
  return (
    <div className="tab-container">
      <ul className="tab-items ">
        {items.map((item) => (
          <li
            onClick={() => handleClick({ ...item })}
            className={`tab-items__item ${
              item.name == currentTab ? "active" : ""
            }`}
          >
            {item.label}
            {item.name == currentTab ? (
              <m.div className="underline" layoutId="underline" />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TabItems;

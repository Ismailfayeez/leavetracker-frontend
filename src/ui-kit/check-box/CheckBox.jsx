import React from "react";
import "./checkBox.scss";
function CheckBox({ label, handleClick, value, id, checked }) {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        onClick={handleClick}
        id={id}
        checked={checked}
        value={value}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default CheckBox;

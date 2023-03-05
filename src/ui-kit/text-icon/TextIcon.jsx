import React from "react";
import "./textIcon.scss";
function TextIcon({ text, color }) {
  return <div className={`text-icon text-icon--${color}`}>{text}</div>;
}

export default TextIcon;

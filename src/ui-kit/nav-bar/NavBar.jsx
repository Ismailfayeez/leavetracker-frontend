import React from "react";
import "../../styles/scss/utilities.scss";
function NavBar({ children }) {
  return <nav className={`navbar`}>{children}</nav>;
}

export default NavBar;

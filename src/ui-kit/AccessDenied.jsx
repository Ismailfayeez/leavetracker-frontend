import React from "react";
import { ReactComponent as AccessDeniedImg } from "../assets/images/access-denied.svg";
function AccessDenied(props) {
  return (
    <div className="access-denied full-height flex flex--center app-content">
      <div className="flex flex--column gap--1rem">
        <AccessDeniedImg className="illustration base-size" />
        <p style={{ textAlign: "center" }}>
          Access Denied
          <br />
          contact Project Administrator
        </p>
      </div>
    </div>
  );
}

export default AccessDenied;

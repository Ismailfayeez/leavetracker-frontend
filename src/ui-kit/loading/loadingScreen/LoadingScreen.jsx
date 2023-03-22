import React from "react";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import "./loadingScreen.scss";
function LoadingScreen(props) {
  return (
    <div className="loading-screen flex flex--center">
      <div className="loading-spinner-container">
        <LoadingSpinner />
      </div>
      Loading
    </div>
  );
}

export default LoadingScreen;

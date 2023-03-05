import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./loadingSpinner.scss";
function LoadingSpinner(props) {
  return <FontAwesomeIcon icon={faSpinner} className="loading-spinner" />;
}

export default LoadingSpinner;

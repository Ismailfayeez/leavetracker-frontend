import _ from "lodash";
import React from "react";
import "./infoDisplay.scss";
function InfoDisplay({
  item,
  name,
  path,
  label = name,
  getLabelContent,
  getBodyContent,
  defaultVal,
  className,
}) {
  const result = _.get(item, path || name);
  return (
    <div className={`info-display-item form-group ${className || ""}`}>
      {getLabelContent ? getLabelContent(item) : <label>{label}</label>}
      {getBodyContent ? (
        getBodyContent(item)
      ) : result == undefined ? (
        defaultVal || "-"
      ) : (
        <span>{result}</span>
      )}
    </div>
  );
}

export default InfoDisplay;

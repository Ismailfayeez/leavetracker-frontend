import React from "react";
import InfoDisplay from "../info-display/InfoDisplay";
import "./infoDisplayList.scss";
function InfoDisplayList({
  data = [],
  columns = [],
  className,
  ...otherProps
}) {
  return (
    <div className="info-display-list">
      {data.map((item) => (
        <div className={`info-display-data ${className || ""}`}>
          {columns.map((column) => (
            <InfoDisplay item={item} {...column} {...otherProps} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default InfoDisplayList;

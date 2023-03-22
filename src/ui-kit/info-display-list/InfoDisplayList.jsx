import React, { useId } from "react";
import InfoDisplay from "../info-display/InfoDisplay";
import "./infoDisplayList.scss";
function InfoDisplayList({
  data = [],
  columns = [],
  className,
  ...otherProps
}) {
  const id = useId();
  console.log(data);
  return (
    <div className="info-display-list">
      {data.map((item) => (
        <div
          className={`info-display-data ${className || ""}`}
          key={item.id + id}
        >
          {columns.map((column) => (
            <InfoDisplay
              key={column.name + id}
              item={item}
              {...column}
              {...otherProps}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default InfoDisplayList;

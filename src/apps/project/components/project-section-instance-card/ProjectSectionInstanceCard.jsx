import _ from "lodash";
import React from "react";

function ProjectSectionInstanceCard({ item, rows }) {
  const renderCell = (item, column, index) => {
    if (column.content) return column.content(item, index);
    return _.get(item, column.path, "-");
  };

  return (
    <div>
      {rows.map((row) => (
        <div>{renderCell(item, row)}</div>
      ))}
    </div>
  );
}

export default ProjectSectionInstanceCard;

import _ from "lodash";
import React from "react";
import "./projectSectionItemCard.scss";
function ProjectSectionItemCard({ item, rows }) {
  const renderCell = (item, column, index) => {
    if (column.content) return column.content(item, index);
    return <div className="card__item">{_.get(item, column.path, "-")}</div>;
  };

  return (
    <div className="project-section-item card">
      {rows.map((row) => renderCell(item, row))}
    </div>
  );
}

export default ProjectSectionItemCard;

import React, { useContext } from "react";
import { projectGlobalModalNav } from "../../../project.constants";
import ProjectSectionItemCard from "../project-section-item-card/ProjectSectionItemCard";
import "./projectSectionItemList.scss";
function ProjectSectionItemList({ data, rows }) {
  return (
    <div className="project-section-item-list">
      {data.map((item) => (
        <ProjectSectionItemCard item={item} rows={rows} />
      ))}
    </div>
  );
}

export default ProjectSectionItemList;

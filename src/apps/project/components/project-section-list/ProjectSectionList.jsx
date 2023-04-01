import React from 'react';
import ProjectSectionInstanceCard from '../project-section-instance-card/ProjectSectionInstanceCard';

function ProjectSectionList({ data, rows }) {
  return (
    <>
      {data.map((item) => (
        <ProjectSectionInstanceCard item={item} rows={rows} />
      ))}
    </>
  );
}

export default ProjectSectionList;

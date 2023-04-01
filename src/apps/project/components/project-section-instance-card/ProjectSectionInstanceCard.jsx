import _ from 'lodash';
import React from 'react';

function ProjectSectionInstanceCard({ item, rows }) {
  const renderCell = (i, column, index) => {
    if (column.content) return column.content(i, index);
    return _.get(i, column.path, '-');
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

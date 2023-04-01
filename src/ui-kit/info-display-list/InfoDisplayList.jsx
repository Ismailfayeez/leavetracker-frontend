import React from 'react';
import InfoDisplay from '../info-display/InfoDisplay';
import './infoDisplayList.scss';

function InfoDisplayList({ data = [], columns = [], className, ...otherProps }) {
  return (
    <div className="info-display-list">
      {data.map((item, index) => (
        <div className={`info-display-data ${className || ''}`} key={index}>
          {columns.map((column) => (
            <InfoDisplay key={column.key || column.name} item={item} {...column} {...otherProps} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default InfoDisplayList;

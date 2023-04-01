import _ from 'lodash';
import React from 'react';
import './infoDisplay.scss';

function InfoDisplay({
  item,
  name,
  path,
  label = name,
  getLabelContent,
  getBodyContent,
  defaultVal,
  className
}) {
  const result = _.get(item, path || name, undefined);
  return (
    <div className={`info-display-item form-group ${className || ''}`}>
      {getLabelContent ? getLabelContent(item) : <p className="info-label">{label}</p>}
      {getBodyContent ? getBodyContent(item) : !result ? defaultVal || '-' : <span>{result}</span>}
    </div>
  );
}

export default InfoDisplay;

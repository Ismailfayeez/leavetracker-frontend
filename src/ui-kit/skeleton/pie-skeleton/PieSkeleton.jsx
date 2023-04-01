import React from 'react';
import './pieSkeleton.scss';
import '../skeleton.scss';

function PieSkeleton() {
  return (
    <div className="pie-skeleton flex flex--column flex--center gap--10px">
      <div className="pie-label" />
      <div className="pie-circle" />
      <div className="flex flex--center full-width gap--10px">
        <div className="line-skeleton" style={{ width: '5%' }} />
        <div className="line-skeleton" style={{ width: '45%' }} />
      </div>
    </div>
  );
}

export default PieSkeleton;

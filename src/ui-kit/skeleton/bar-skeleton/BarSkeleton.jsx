import React from 'react';
import './barSkeleton.scss';

function BarSkeleton() {
  return (
    <div
      className="flex flex--column flex--center gap--10px"
      style={{ margin: '1rem', width: '95%' }}>
      <div className="flex-grow full-width">
        <div className="bar-skeleton">
          <div className="bar bar--1" />
          <div className="bar bar--2" />
          <div className="bar bar--3" />
          <div className="bar bar--4" />
        </div>
      </div>
      <div className="flex gap--10px full-width" style={{ padding: '0 1.5rem' }}>
        <div className="line-skeleton" />
        <div className="line-skeleton" />
        <div className="line-skeleton" />
        <div className="line-skeleton" />
      </div>
    </div>
  );
}

export default BarSkeleton;

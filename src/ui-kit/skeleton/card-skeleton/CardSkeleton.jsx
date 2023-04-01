import React from 'react';
import './cardSkeleton.scss';

function CardSkeleton() {
  return (
    <div className="card-skeleton">
      <div className="card-skeleton__avatar" />
      <div className="flex-item-grow" style={{ margin: 'auto' }}>
        <div className="card-skeleton__text-line" />
        <div className="card-skeleton__text-line" />
      </div>
    </div>
  );
}

export default CardSkeleton;

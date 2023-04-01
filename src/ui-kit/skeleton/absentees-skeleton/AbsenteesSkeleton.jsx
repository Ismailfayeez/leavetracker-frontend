import React from 'react';
import CardSkeleton from '../card-skeleton/CardSkeleton';
import SearchBarSkeleton from '../searchbar-skeleton/SearchBarSkeleton';
import '../skeleton.scss';

function AbsenteesSkeleton() {
  return (
    <div className="absentees-skeleton flex flex--column gap--10px">
      <SearchBarSkeleton />
      <div className="line-skeleton" style={{ width: '50%', marginLeft: '1rem' }} />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

export default AbsenteesSkeleton;

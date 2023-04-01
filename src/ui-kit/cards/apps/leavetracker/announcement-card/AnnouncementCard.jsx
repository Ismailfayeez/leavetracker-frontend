import React from 'react';
import './announcementCard.scss';

function AnnouncementCard({ data, handleTitle }) {
  const priorityColor =
    data.priority === 'high' ? 'red' : data.priority === 'medium' ? 'orange' : 'darkgrey';
  return (
    <div className="card announcement">
      <div className="flex flex-justify--space-between">
        <span className="announcement__by sub-text">By {data.created_by}</span>
        <div>
          <span className="announcement__priority sub-text" style={{ color: priorityColor }}>
            {data.priority}
          </span>{' '}
          {!data.viewed_by && <span className="new-badge" />}
        </div>
      </div>
      <div className="flex text-overflow--ellipsis overflow-hidden">
        <span
          className="announcement__title bold"
          onClick={() => handleTitle(data.id)}
          role="presentation">
          {data.title}
        </span>
      </div>
      <div className="flex flex--end">
        <span className="announcement__expiry-info sub-text "> expires on {data.expiry_date}</span>
      </div>
    </div>
  );
}

export default AnnouncementCard;

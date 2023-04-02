import React from 'react';
import { Link } from 'react-router-dom';
import './projectSectionCard.scss';

function ProjectSectionCard({ label, path, icon: Icon, handleClickLabel, totalRecordsCount }) {
  return (
    <div className="card project-section">
      <div className="card__body flex">
        <div className="flex-item-grow">
          <div className="project-section__title card__item">
            {handleClickLabel ? (
              <span onClick={handleClickLabel} role="presentation">
                {label}
              </span>
            ) : (
              <Link className="link-style-disable" to={path}>
                <span>{label}</span>
              </Link>
            )}
          </div>
          <div className="project-section__count">
            {totalRecordsCount !== undefined && (
              <span>
                {totalRecordsCount || 'no'} active record
                {totalRecordsCount > 1 && 's'}
              </span>
            )}
            {totalRecordsCount === undefined && <div className="allocate-space" />}
          </div>
        </div>
        {Icon && <Icon className="project-section__icon" />}
      </div>
    </div>
  );
}

export default ProjectSectionCard;

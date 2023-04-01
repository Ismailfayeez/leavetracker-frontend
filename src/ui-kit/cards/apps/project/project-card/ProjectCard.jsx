import React from 'react';
import './projectCard.scss';

function ProjectCard({ title, name, description, className }) {
  return (
    <div className={`project card ${className}`}>
      <div className="card__body flex--center gap--5px">
        <div className="profile-img-container">
          <div className="profile-img">{name.slice(0, 1)}</div>
        </div>
        <div>
          <div className="project__title card__item label">{title}</div>
          <div className="project__description card__item">{description}</div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;

import React from "react";
import "./projectCard.scss";
function ProjectCard({ logo, title, description, className }) {
  return (
    <div className={`project card ${className}`}>
      <div className="card__body">
        <div className="project__logo card__item">{logo}</div>
        <div className="project__title card__item">{title}</div>
        <div className="project__description card__item">{description}</div>
      </div>
    </div>
  );
}

export default ProjectCard;

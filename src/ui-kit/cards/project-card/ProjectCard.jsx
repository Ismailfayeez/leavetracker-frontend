import React from 'react';
import "./projectCard.scss"
function ProjectCard({logo,title,description, className}) {
    return (
        <div className={`project-card ${className}`}>
            <div className='project-card__content'>
                <div className='project-card__logo'>{logo}</div>
                <div className='project-card__title'>{title}</div>
                <div className='project-card__description'>{description}</div>
            </div>
        </div>
    );
}

export default ProjectCard;
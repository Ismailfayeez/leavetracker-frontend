import React from "react";
import TextIcon from "../../../../text-icon/TextIcon";
import "./absenteeCard.scss";
function AbsenteeCard({ name, groups, handleClick }) {
  return (
    <div className="card absentee card--pale-blue-paste">
      <div className="card__body">
        <div className="flex">
          <div className="flex flex--center">
            <div className="icon-container">
              <TextIcon text="I" color="black" />
            </div>
          </div>
          <div className="flex-grow overflow-auto">
            <div
              className="card__item absentee__name text-overflow-ellipsis cursor-pointer"
              onClick={handleClick}
            >
              {name}
            </div>
            <div className="card__item absentee__group-list text-overflow-ellipsis sub-text">
              {groups.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbsenteeCard;

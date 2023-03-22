import React from "react";
import { sliceFirstLettersOfSentence } from "../../../../../utilities/helper";
import "./absenteeCard.scss";
function AbsenteeCard({ name, groups, handleClick }) {
  return (
    <div className="card absentee card--pale-blue-paste">
      <div className="card__body">
        <div className="flex gap--10px">
          <div className="flex flex--center">
            <div className="profile-img-container">
              <div className="profile-img">
                {sliceFirstLettersOfSentence(name)}
              </div>
            </div>
          </div>
          <div className="flex-item-grow overflow--auto">
            <div
              className="card__item absentee__name text-overflow--ellipsis cursor-pointer"
              onClick={handleClick}
            >
              {name}
            </div>
            <div className="card__item absentee__group-list text-overflow--ellipsis sub-text">
              {groups.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbsenteeCard;

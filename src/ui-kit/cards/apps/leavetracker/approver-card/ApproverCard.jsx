import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { renderButton } from "../../../../../utilities/uiElements";
import "./approverCard.scss";

function ApproverCard({ approver, enableRemoveBtn, handleRemove, loading }) {
  return (
    <div className={`approver card approver--pista-green`}>
      <div className="card__body flex flex--center gap--5px">
        <div className="profile-img-container">
          <div className="profile-img">{approver.username.slice(0, 1)}</div>
        </div>
        <div className="flex-item-grow overflow--hidden">
          <div className="approver__name label bold overflow--hidden text-overflow--ellipsis text-transform--capitalize">
            {approver.username}
          </div>
          <div className="approver__email sub-text overflow--hidden text-overflow--ellipsis">
            {approver.email}
          </div>
        </div>
        {enableRemoveBtn && (
          <div className="flex--center">
            {renderButton({
              content: (
                <div className="remove-icon">
                  <FontAwesomeIcon icon={faXmark} className="color--black" />
                </div>
              ),
              className: "btn--transparent",
              onClick: handleRemove,
              loading,
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApproverCard;

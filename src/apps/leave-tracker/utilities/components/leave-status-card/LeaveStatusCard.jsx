import { faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Pending } from "../../../leaveTracker.constants";
import "./leaveStatusCard.scss";
function LeaveStatusCard({
  leave,
  handleInfoModal,
  handleStatusModal,
  enableDelete,
  handleDeleteLeave,
  sectionConstants,
  className,
}) {
  return (
    <div className={`card leave-status ${className || ""} card--bluish-white`}>
      <div className="leave-status__info leave-status__item">
        <div
          className="leave-status__request-no bold cursor-pointer"
          onClick={() => handleInfoModal(leave)}
        >
          {leave.request_number}
        </div>
        <div className="leave-status__range">
          <span className="leave-status__from-date">{leave.from_date}</span>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="leave-status__range-arrow"
          />
          <span className="leave-status__to-date">{leave.to_date}</span>
        </div>
      </div>
      <div
        className="leave-status__item leave-status__status cursor-pointer"
        onClick={() => handleStatusModal(leave)}
      >
        {leave.status}
      </div>
      {enableDelete && leave.status == Pending.name && (
        <FontAwesomeIcon
          icon={faTrash}
          className="leave-status__delete-icon"
          onClick={() => {
            const { leave_dates, ...others } = leave;
            return handleDeleteLeave(
              { ...others, leaveDaysCount: leave_dates.length },
              sectionConstants.name
            );
          }}
        />
      )}
    </div>
  );
}

export default LeaveStatusCard;

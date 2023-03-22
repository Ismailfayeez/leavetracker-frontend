import React from "react";
import { faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./leaveRequestCard.scss";
import moment from "moment";
function LeaveRequestCard({
  leave = {},
  handleRequest,
  handleStatus,
  enableDelete,
  handleDelete,
  className,
}) {
  return (
    <div className={`leave-request card ${className || ""}`}>
      <div className="card__body">
        <div className="flex gap--10px">
          <div className="flex-item-grow overflow--auto">
            <div
              className="card__item leave-request__no bold cursor-pointer text-overflow--ellipsis"
              onClick={() => handleRequest(leave)}
            >
              {leave.request_number}
            </div>
            {leave.employee && (
              <div className="leave-request__employee sub-text text-overflow--ellipsis">
                {leave.employee.name}
              </div>
            )}
            <div className="leave-request__range sub-text text-overflow--ellipsis">
              <span className="card__item leave-request__from ">
                {moment(leave.from_date).format("DD MMM YY")}
              </span>
              <FontAwesomeIcon icon={faArrowRight} className="range-arrow" />
              <span className="card__item leave-request__to ">
                {moment(leave.to_date).format("DD MMM YY")}
              </span>
            </div>
          </div>
          <div className="flex flex--center">
            <div
              className="card__item leave-request__status bold cursor-pointer"
              onClick={() => handleStatus(leave)}
            >
              {leave.status}
            </div>
          </div>
          {leave.is_delete && enableDelete && (
            <div className="flex flex--center">
              <FontAwesomeIcon
                icon={faTrash}
                className="trash-can cursor-pointer"
                onClick={() => handleDelete(leave)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaveRequestCard;

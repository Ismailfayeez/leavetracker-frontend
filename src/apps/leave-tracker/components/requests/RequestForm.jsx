import React, { useEffect, useState } from "react";
import "./request.scss";
import {
  faCircleChevronDown,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import {
  renderAutoComplete,
  renderButton,
  renderInput,
  renderSelect,
  renderTextArea,
} from "../../../../utilities/uiElements";

function RequestForm(props) {
  const {
    data,
    errors,
    leaveList,
    dropDownOptions,
    optionKeys,
    handleChange,
    handleBlur,
    handleSelect,
    handleSubmit,
    handleReset,
    suggestions,
    setDisplayLeaveBalance,
    isLoading,
    onSubmitLoading,
  } = props;
  const [showLeaveDates, setShowLeaveDates] = useState(false);

  return (
    <form
      className="leave-request__form grid grid--1x2"
      onSubmit={handleSubmit}
    >
      {renderInput({
        name: "from",
        label: "From date",
        type: "date",
        data,
        handleChange,
        onBlur: handleBlur,
        errors,
      })}
      {renderInput({
        name: "to",
        label: "To date",
        type: "date",
        data,
        handleChange,
        onBlur: handleBlur,
        errors,
      })}
      {leaveList.length > 0 && (
        <div className="leave-request__leave-dates">
          <label className="label bold">
            leave dates
            <FontAwesomeIcon
              icon={showLeaveDates ? faCircleChevronRight : faCircleChevronDown}
              className="circle-arrow"
              onClick={() => setShowLeaveDates(!showLeaveDates)}
            />
          </label>
          {showLeaveDates && (
            <div className="leave-dates__body sub-text">{leaveList}</div>
          )}
        </div>
      )}
      {renderSelect({
        name: "leaveType",
        label: "Type",
        options: dropDownOptions.leaveType,
        data,
        handleChange,
        optionKeys,
        onBlur: handleBlur,
        errors,
      })}
      {renderSelect({
        name: "leaveDuration",
        label: "Leave Duration",
        options: dropDownOptions.leaveDuration,
        data,
        handleChange,
        optionKeys,
        onBlur: handleBlur,
        errors,
      })}
      {renderTextArea({
        name: "leaveReason",
        label: "Leave reason",
        data,
        handleChange,
        row: "5",
        col: "10",
        onBlur: handleBlur,
        errors,
      })}
      {renderAutoComplete({
        data,
        name: "reachoutPerson",
        label: "Reachout person",
        errors,
        handleChange,
        suggestions,
        isLoading,
        handleSelect,
      })}

      <div className="">
        <span
          className="leave-request__calculated-balance-link cursor-pointer"
          onClick={() => setDisplayLeaveBalance(true)}
        >
          view calculated leave balance
        </span>
      </div>

      <div className="leave-request__btn-container btn-container-grow flex flex--center">
        {renderButton({
          type: "submit",
          content: "Submit",
          className: "btn--md btn--matte-black",
          loading: onSubmitLoading,
        })}
        {renderButton({
          type: "reset",
          content: "Reset",
          className: "btn--md btn--matte-black-outline",
          onClick: (e) => {
            e.preventDefault();
            handleReset();
          },
        })}
      </div>
    </form>
  );
}

export default RequestForm;

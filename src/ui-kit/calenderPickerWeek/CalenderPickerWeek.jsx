import "./calenderPickerWeek.scss";

import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";

function CalenderPickerWeek({
  dateList,
  handleDateSelect,
  handlePrevWeek,
  handleNextWeek,
  activeDate,
  className,
}) {
  console.log(window.innerWidth);
  return (
    <div className={`calendar-picker week ${className}`}>
      <div className="calendar-picker__prev-arrow-btn" onClick={handlePrevWeek}>
        {<FontAwesomeIcon icon={faGreaterThan} />}
      </div>
      <div className={"calendar-picker__dates"}>
        {dateList.map((date) => (
          <div
            onClick={() => handleDateSelect(date)}
            className={`calendar-picker__date ${
              date == activeDate ? "calendar-picker__date-active" : ""
            }`}
          >
            <div className="calendar-picker__day">
              <span className="display-tablet">
                {moment(date, "YYYY-MM-DD").format("dd")}
              </span>
              <span className="display-mobile-only">
                {moment(date, "YYYY-MM-DD").format("dd")[0]}
              </span>
            </div>
            <div className="calendar-picker__dayVal">
              {moment(date, "YYYY-MM-DD").format("D")}
            </div>
          </div>
        ))}
      </div>
      <div className="calendar-picker__next-arrow-btn" onClick={handleNextWeek}>
        {<FontAwesomeIcon icon={faGreaterThan} />}
      </div>
    </div>
  );
}

export default CalenderPickerWeek;

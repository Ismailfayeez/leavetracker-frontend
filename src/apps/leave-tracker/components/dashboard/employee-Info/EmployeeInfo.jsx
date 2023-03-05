import React from "react";
import EmployeePrimaryInfo from "./EmployeePrimaryInfo";
import LeaveBalanceGraph from "./LeaveBalanceGraph";
import "./employeeInfo.scss";
function EmployeeInfo(props) {
  return (
    <div className="employee-info employee-info--dark">
      <header className="leavetracker-content__section__sub-title">
        <h4>My Info</h4>
      </header>
      <div className="grid grid-1x2 grid--tablet-hr gap--1rem ">
        <EmployeePrimaryInfo />
        <LeaveBalanceGraph />
      </div>
    </div>
  );
}

export default EmployeeInfo;

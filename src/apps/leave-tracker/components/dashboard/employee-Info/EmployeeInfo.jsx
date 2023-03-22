import React from "react";
import EmployeePrimaryInfo from "./EmployeePrimaryInfo";
import LeaveBalanceGraph from "./LeaveBalanceGraph";
import "./employeeInfo.scss";
function EmployeeInfo(props) {
  return (
    <div className="employee-info employee-info--dark">
      <header>
        <h4>My Info</h4>
      </header>
      <div className="grid grid--1x2 grid--tablet-hr gap--10px">
        <EmployeePrimaryInfo />
        <LeaveBalanceGraph />
      </div>
    </div>
  );
}

export default EmployeeInfo;

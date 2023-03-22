import React from "react";
import { useSelector } from "react-redux";
import InfoDisplayList from "../../../../../ui-kit/info-display-list/InfoDisplayList";
function EmployeePrimaryInfo(props) {
  const employeeInfo = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.employeeProfile
        .currentEmployee.data
  );
  const coreInfo = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.core
  );
  const { leaveBalance } = employeeInfo;
  const leaveTaken = leaveBalance.reduce(
    (acc, currentValue) => acc + currentValue["leave_taken"],
    0
  );
  const balance = leaveBalance.reduce(
    (acc, currentValue) => acc + currentValue["balance"],
    0
  );
  const columns = [
    { name: "username", label: "Name" },
    { name: "email", label: "Email" },
    {
      name: "leaveTaken",
      label: "Total leave taken in this FY",
      getBodyContent: (myInfo) => (
        <span>{`${myInfo.leaveTaken}/${balance}`}</span>
      ),
    },
    { name: "fy", label: "Fy" },
  ];
  const data = [
    {
      ...employeeInfo,
      leaveTaken,
      fy: coreInfo.currentFY.fiscal_year,
    },
  ];
  return (
    <div className="employee-primary-info overflow-hidden text-overflow--ellipsis">
      <InfoDisplayList
        data={data}
        columns={columns}
        className="grid grid--1x2 grid--tablet-lr-only gap--10px overflow--auto"
      />
    </div>
  );
}

export default EmployeePrimaryInfo;

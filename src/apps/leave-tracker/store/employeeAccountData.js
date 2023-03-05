import { combineReducers } from "@reduxjs/toolkit";
import approvalsReducer from "./approval";
import leavesReducer from "./status";
import groupsReducer from "./groups";
import employeeProfileReducer from "./employeeProfile";
import absenteesReducer from "./absentees";
import coreReducer from "./core";
import { clearEmployeeData } from "./authActions";

const employeeAccountReducer = combineReducers({
  absentees: absenteesReducer,
  leaves: leavesReducer,
  core: coreReducer,
  approval: approvalsReducer,
  groups: groupsReducer,
  employeeProfile: employeeProfileReducer,
});

export default (state, action) => {
  if (action.type === clearEmployeeData.type) {
    return employeeAccountReducer(undefined, action);
  }
  return employeeAccountReducer(state, action);
};

import { combineReducers } from '@reduxjs/toolkit';
import approvalsReducer from './approval';
import leavesReducer from './status';
import groupsReducer from './groups';
import employeeProfileReducer from './employeeProfile';
import absenteesReducer from './absentees';
import coreReducer from './core';
import announcementsReducer from './announcements';
import { clearEmployeeData } from './authActions';

const employeeAccountReducer = combineReducers({
  absentees: absenteesReducer,
  leaves: leavesReducer,
  core: coreReducer,
  approval: approvalsReducer,
  groups: groupsReducer,
  employeeProfile: employeeProfileReducer,
  announcements: announcementsReducer
});

export default (state, action) => {
  if (action.type === clearEmployeeData.type) {
    return employeeAccountReducer(undefined, action);
  }
  return employeeAccountReducer(state, action);
};

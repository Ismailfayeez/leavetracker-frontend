import { combineReducers } from '@reduxjs/toolkit';
import userProfileReducer from './userProfile';
// import leavesReducer from "./leaves";
// import employeeReducer from "./employee";

// import absenteesReducer from "./absentees"
// import loaderReducer from "./loader"
// import authReducer from "./auth";
// import projectDashboardReducer from "./projectDashboard"
// import modalReducer from "./modal"
// import userReducer from "./users"
// import leaveBalanceReducer from "./leaveBalance";

export default combineReducers({
  userProfile: userProfileReducer
});

import { combineReducers } from "@reduxjs/toolkit";
import leaveTrackerReducer from "../apps/leave-tracker/store/leaveTracker";
import projectsReducer from "../apps/project/store/projects"
import authReducer from "../apps/auth/store/auth"
import errorReducer from "./error"
export default combineReducers({
leaveTracker:leaveTrackerReducer,
projects:projectsReducer,
auth: authReducer,
error:errorReducer
})

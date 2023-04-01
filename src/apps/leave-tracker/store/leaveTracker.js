import { combineReducers } from '@reduxjs/toolkit';
import employeeAccountReducer from './employeeAccountData';

export default combineReducers({
  employeeAccountData: employeeAccountReducer
});

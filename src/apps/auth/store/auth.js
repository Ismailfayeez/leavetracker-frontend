import { combineReducers } from '@reduxjs/toolkit';
import userProfileReducer from './userProfile';

export default combineReducers({
  userProfile: userProfileReducer
});

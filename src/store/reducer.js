import { combineReducers } from '@reduxjs/toolkit';
import { logoutUser } from './authActions';
import entitiesReducer from './entities';

const appReducer = combineReducers({
  entities: entitiesReducer
});

const rootReducer = (state, action) => {
  if (action.type === logoutUser.type) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
export default rootReducer;

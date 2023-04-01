import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../../../store/apiActions';

const initialState = {
  leaveType: [],
  leaveDuration: [],
  currentFY: ''
};
const slice = createSlice({
  name: 'core',
  initialState: {
    ...initialState
  },
  reducers: {
    coreDataReceived: (core, action) => {
      const { data, sectionNames } = action.payload;
      sectionNames.forEach((name, index) => {
        core[name] = data[index];
      });
    }
  }
});
export const { coreDataReceived } = slice.actions;
export default slice.reducer;

export const getEmployee = (config) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: config.url
    })
  );
};

export const loadCoreData =
  ({ requestDetails }) =>
  (dispatch) => {
    const requestParams = requestDetails.map(({ name, ...others }) => ({
      ...others
    }));
    const sectionNames = requestDetails.map(({ name }) => name);
    return dispatch(
      apiCallBegan({
        requestParams,
        onSuccess: coreDataReceived({ sectionNames })
      })
    );
  };

import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../../../store/apiActions';
import { CURRENT_USER_URL, LOGIN_USER_URL, USERS_URL } from '../apiConstants';

const slice = createSlice({
  name: 'moduleAccess',
  initialState: {
    data: []
  },
  reducers: {
    moduleAccessListReceived: (moduleAccess, action) => {
      const { data } = action.payload;
      moduleAccess.data = data;
    }
  }
});
export const {
  currentUserLoading,
  currentUserReceived,
  ltAccountsReceived,
  ltCurrentProjectReceived,
  currentProjectAddedToSession,
  utilsReceived
} = slice.actions;
export default slice.reducer;

export const loadTotalModuleAccess = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      requestParams: { url: CURRENT_USER_URL },
      onStart: currentUserLoading({ isLoading: true }),
      onSuccess: currentUserReceived(),
      onEnd: currentUserLoading({ isLoading: false })
    })
  );
};

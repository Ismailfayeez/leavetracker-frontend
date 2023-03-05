import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../store/apiActions";
import { MY_ACCOUNTS_URL } from "../../leave-tracker/apiConstants";
import { CURRENT_USER_URL, LOGIN_USER_URL, USERS_URL } from "../apiConstants";

const slice = createSlice({
  name: "userProflie",
  initialState: {
    currentUser: {
      isLoading: false,
      data: {
        leaveTracker: {},
      },
    },
    utils: {
      countries: {
        data: [],
        lastFetch: "",
      },
      timeZone: {
        data: {},
        lastFetch: "",
      },
    },
  },
  reducers: {
    currentUserLoading: (userProfile, action) => {
      userProfile["currentUser"]["isLoading"] = action.payload.isLoading;
    },
    currentUserReceived: (userProfile, action) => {
      const { data } = action.payload;
      userProfile["currentUser"]["data"] = {
        ...userProfile["currentUser"]["data"],
        ...data,
      };
    },
    ltAccountsReceived: (userProfile, action) => {
      const { data } = action.payload;
      userProfile["currentUser"]["data"]["leaveTracker"] = {
        ...userProfile["currentUser"]["data"]["leaveTracker"],
        accounts: [...data],
      };
    },
    ltCurrentProjectReceived: (userProfile, action) => {
      const { data } = action.payload;
      if (data) {
        userProfile["currentUser"]["data"]["leaveTracker"] = {
          ...userProfile["currentUser"]["data"]["leaveTracker"],
          currentProject: data,
        };
      }
    },
    currentProjectAddedToSession: (userProfile, action) => {
      const {
        account: { project: id, project_name: name },
      } = action.payload;
      userProfile["currentUser"]["data"]["leaveTracker"] = {
        ...userProfile["currentUser"]["data"]["leaveTracker"],
        currentProject: { id, name },
      };
    },
    utilsReceived: (userProfile, action) => {
      const { data, name } = action.payload;
      console.log(data, name);
      userProfile["utils"][name]["data"] = data;
      userProfile["utils"][name]["lastFetch"] = Date.now();
    },
  },
});
export const {
  currentUserLoading,
  currentUserReceived,
  ltAccountsReceived,
  ltCurrentProjectReceived,
  currentProjectAddedToSession,
  utilsReceived,
} = slice.actions;
export default slice.reducer;

export const loadCurrentUser = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      requestParams: { url: CURRENT_USER_URL },
      onStart: currentUserLoading({ isLoading: true }),
      onSuccess: currentUserReceived(),
      onEnd: currentUserLoading({ isLoading: false }),
    })
  );
};

export const updateCurrentUser = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      requestParams: { url: CURRENT_USER_URL, data, method: "put" },
      onSuccess: currentUserReceived(),
    })
  );
};

export const login = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      requestParams: { url: LOGIN_USER_URL, data, method: "post" },
    })
  );
};
export const signup = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      requestParams: { url: USERS_URL, data, method: "post" },
    })
  );
};
export const loadLtCurrentProject = (url) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      requestparams: { url },
      onSuccess: ltCurrentProjectReceived(),
    })
  );
};
export const loadMyLtAccounts = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      requestParams: { url: MY_ACCOUNTS_URL },
      onSuccess: ltAccountsReceived(),
    })
  );
};

export const addCurrentProjectToSession =
  ({ url, data, account }) =>
  (dispatch) => {
    return dispatch(
      apiCallBegan({
        requestParams: { url, method: "post", data },
        onSuccess: currentProjectAddedToSession({ account }),
      })
    );
  };

export const loadUtils =
  ({ url, name }) =>
  (dispatch) => {
    return dispatch(
      apiCallBegan({
        requestParams: { url },
        onSuccess: utilsReceived({ name }),
      })
    );
  };

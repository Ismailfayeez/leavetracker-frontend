import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiCallBegan } from "../../../store/apiActions";
import { cachingTimeExpired } from "../../../utilities/helper";
import { Pending } from "../leaveTracker.constants";
const slice = createSlice({
  name: "approval",
  initialState: {
    isLoading: false,
    lastFetch: "",
    newApproval: {
      list: [],
    },
    actionedApproval: {
      list: [],
    },
    previousApproval: {
      list: [],
    },
    approvalStatus: {
      isLoading: false,
      data: "",
    },
  },
  reducers: {
    loaderUpdated: (approval, action) => {
      approval.isLoading = action.payload.loading;
    },
    approvalReceived: (approval, action) => {
      const { data, sectionNames } = action.payload;
      if (!(sectionNames && data)) return;
      if (Array.isArray(data) && Array.isArray(sectionNames)) {
        sectionNames.forEach((name, index) => {
          approval[name]["list"] = data[index];
        });
        approval.lastFetch = Date.now();
      }
    },
    approvalUpdated: (approval, action) => {
      const { data, name } = action.payload;
      approval[name]["list"] = approval[name]["list"].filter(
        (i) => i.id !== data.id
      );
      approval["actionedApproval"]["list"].push(data);
    },
  },
});

export const { loaderUpdated, approvalReceived, approvalUpdated } =
  slice.actions;
export default slice.reducer;

// dispatch

export const loadApprovalData = (requestDetails) => (dispatch, getState) => {
  const { lastFetch } =
    getState().entities.leaveTracker.employeeAccountData.approval;
  if (!cachingTimeExpired(lastFetch)) return;
  const requestParams = requestDetails.map(({ name, ...others }) => ({
    ...others,
  }));

  const sectionNames = requestDetails.map(({ name }) => name);
  return dispatch(
    apiCallBegan({
      requestParams,
      onStart: loaderUpdated({ loading: true }),
      onSuccess: approvalReceived({ sectionNames }),
      onEnd: loaderUpdated({ loading: false }),
    })
  );
};

export const updateApproval =
  ({ baseUrl, name, id, data }) =>
  (dispatch) => {
    const url = baseUrl + id + "/";

    return dispatch(
      apiCallBegan({
        requestParams: { url, data, method: "patch" },
        onStart: loaderUpdated({ loading: true }),
        onSuccess: approvalUpdated({ name }),
        onEnd: loaderUpdated({ loading: false }),
      })
    );
  };

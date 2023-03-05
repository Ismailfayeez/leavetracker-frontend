import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../store/apiActions";
import { cachingTimeExpired } from "../../../utilities/helper";
import { REQUEST_URL } from "../apiConstants";

const initialState = {
  myLeaves: {
    isLoading: false,
    lastFetch: "",
    lastModified: "",
    upcoming: {
      list: [],
    },
    previous: {
      list: [],
    },
  },
  leaveApprovalStatus: {
    isLoading: false,
    data: "",
  },
};

const slice = createSlice({
  name: "leaves",
  initialState: { ...initialState },
  reducers: {
    myLeavesLoaderUpdated: (leaves, action) => {
      leaves.myLeaves.isLoading = action.payload.loading;
    },
    myLeavesReceived: (leaves, action) => {
      const { data, sectionNames } = action.payload;
      if (Array.isArray(data) && Array.isArray(sectionNames)) {
        sectionNames.forEach((name, index) => {
          leaves["myLeaves"][name]["list"] = data[index];
        });
      }
      leaves["myLeaves"]["lastFetch"] = Date.now();
      leaves["myLeaves"]["lastModified"] = "";
    },
    leaveRequestCreated: (leaves, action) => {
      const { data } = action.payload;
      leaves["myLeaves"]["upcoming"]["list"].push(data);
      leaves["myLeaves"]["lastModified"] = Date.now();
    },
    leaveRequestDestroyed: (leaves, action) => {
      const { id } = action.payload;
      leaves["myLeaves"]["upcoming"]["list"] = leaves["myLeaves"]["upcoming"][
        "list"
      ].filter((leave) => leave.id != id);
      leaves["myLeaves"]["lastModified"] = Date.now();
    },
  },
});
export const {
  myLeavesLoaderUpdated,
  myLeavesReceived,
  leaveRequestCreated,
  leaveRequestDestroyed,
} = slice.actions;
export default slice.reducer;

export const loadMyLeaves =
  ({ requestDetails }) =>
  (dispatch, getState) => {
    const { lastFetch } =
      getState().entities.leaveTracker.employeeAccountData.leaves.myLeaves;
    if (!cachingTimeExpired(lastFetch)) return;

    const requestParams = requestDetails.map(({ name, ...others }) => ({
      ...others,
    }));

    const sectionNames = requestDetails.map(({ name }) => name);

    return dispatch(
      apiCallBegan({
        requestParams,
        onStart: myLeavesLoaderUpdated({ loading: true }),
        onSuccess: myLeavesReceived({ sectionNames }),
        onEnd: myLeavesLoaderUpdated({ loading: false }),
      })
    );
  };
export const createLeaveRequest = (props) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      requestParams: { method: "post", ...props },
      onSuccess: leaveRequestCreated(),
    })
  );
};

export const deleteLeaveRequest =
  ({ id }) =>
  (dispatch) => {
    const url = REQUEST_URL + `${id}/`;
    return dispatch(
      apiCallBegan({
        requestParams: { url, method: "delete" },
        onSuccess: leaveRequestDestroyed({ id }),
      })
    );
  };

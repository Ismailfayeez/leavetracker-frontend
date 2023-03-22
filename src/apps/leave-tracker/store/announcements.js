import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../store/apiActions";
import { ANNOUNCEMENT_URL } from "../apiConstants";
const initialState = {
  list: {
    isLoading: false,
    lastFetch: "",
    data: [],
  },
  detail: { isLoading: true, lastFetch: "", data: {} },
};
const slice = createSlice({
  name: "announcements",
  initialState: { ...initialState },
  reducers: {
    announcementListReceived: (announcements, action) => {
      const { data } = action.payload;
      announcements["list"] = {
        ...announcements["list"],
        data,
        lastFetch: Date.now(),
      };
    },
    announcementDetailReceived: (announcements, action) => {
      const { data } = action.payload;
      announcements["detail"] = {
        ...announcements["detail"],
        data,
        lastFetch: Date.now(),
      };
    },
    announcementDetailCleared: (announcements, action) => {
      announcements["detail"] = initialState.detail;
    },
    announcementsListLoaderUpdated: (absentees, action) => {
      absentees.list.isLoading = action.payload.loading;
    },
    announcementsDetailLoaderUpdated: (absentees, action) => {
      absentees.detail.isLoading = action.payload.loading;
    },
    announcementCreated: (announcements, action) => {
      const { data } = action.payload;
      announcements["list"]["data"].push(data);
    },
  },
});

export const {
  announcementListReceived,
  announcementDetailReceived,
  announcementsListLoaderUpdated,
  announcementsDetailLoaderUpdated,
  announcementCreated,
  announcementDetailCleared,
} = slice.actions;

export default slice.reducer;

// dispatch

export const loadAnnouncements = () => (dispatch) => {
  const url = ANNOUNCEMENT_URL;
  return dispatch(
    apiCallBegan({
      requestParams: { url },
      onStart: announcementsListLoaderUpdated({ loading: true }),
      onSuccess: announcementListReceived(),
      onEnd: announcementsListLoaderUpdated({ loading: false }),
    })
  );
};
export const createAnnouncement = (data) => (dispatch) => {
  const url = ANNOUNCEMENT_URL;
  return dispatch(
    apiCallBegan({
      requestParams: { url, data, method: "post" },
      onSuccess: announcementCreated(),
    })
  );
};

export const loadAnnouncementDetail = (id) => (dispatch) => {
  const url = ANNOUNCEMENT_URL + id;
  return dispatch(
    apiCallBegan({
      requestParams: { url },
      onStart: announcementsDetailLoaderUpdated({ loading: true }),
      onSuccess: announcementDetailReceived(),
      onEnd: announcementsDetailLoaderUpdated({ loading: false }),
    })
  );
};

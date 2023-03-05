import { createSlice } from "@reduxjs/toolkit";

import { createSelector } from "reselect";
import { apiCallBegan } from "../../../store/apiActions";
import {
  cachingTimeExpired,
  updateExistingObjWithNewObj,
} from "../../../utilities/helper";

const initialState = {
  myGroups: {
    isLoading: false,
    lastFetch: "",
    lastModified: "",
    list: [],
  },
  allGroups: {
    isLoading: false,
    lastFetch: "",
    lastModified: "",
    list: [],
  },
  detail: {
    isLoading: false,
    data: { name: "", description: "", team_members: [] },
  },
};

const slice = createSlice({
  name: "groups",
  initialState: { ...initialState },
  reducers: {
    groupsLoaderUpdated: (groups, action) => {
      const { name, loading } = action.payload;
      groups[name].isLoading = loading;
    },
    groupsReceived: (groups, action) => {
      const { data, name } = action.payload;
      groups[name]["list"] = data;
      groups[name]["lastFetch"] = Date.now();
      groups[name]["lastModified"] = "";
      groups["detail"] = { ...initialState["detail"] };
    },
    groupCreated: (groups, action) => {
      const { data } = action.payload;
      groups.myGroups.list.push(data);
      groups.myGroups.lastModified = Date.now();
    },
    groupUpdated: (groups, action) => {
      const {
        data: { id, ...otherProps },
      } = action.payload;
      groups["myGroups"]["list"].forEach((group, index, arr) => {
        if (group.id == id) {
          const updatedListData = updateExistingObjWithNewObj(
            group,
            otherProps
          );
          console.log(updatedListData);
          arr[index] = {
            ...updatedListData,
          };
        }
      });
      const updateDetailData = updateExistingObjWithNewObj(
        groups["detail"]["data"],
        otherProps
      );
      groups["detail"]["data"] = { ...updateDetailData };
      groups.myGroups.lastModified = Date.now();
    },
    groupDestroyed: (groups, action) => {
      const { id } = action.payload;
      groups["myGroups"]["list"] = groups["myGroups"]["list"].filter(
        (group) => group.id != id
      );
      groups.myGroups.lastModified = Date.now();
    },
    groupDetailReceived: (groups, action) => {
      const { data } = action.payload;
      groups["detail"]["data"] = data;
    },
    groupMemberReceived: (groups, action) => {
      const { data } = action.payload;
      groups["detail"]["data"]["team_members"] = data;
    },
    groupMemberRemoved: (groups, action) => {
      const { groupId } = action.payload;
      groups["myGroups"]["list"].forEach((group, index, arr) => {
        if (group.id == groupId) {
          arr[index] = { ...group, member_count: group.member_count - 1 };
        }
      });
      groups.myGroups.lastModified = Date.now();
    },
    subscribeGroupRequested: (groups, action) => {
      const { team_id } = action.payload;
      groups["allGroups"]["list"].forEach((group, index, arr) => {
        if (group.id == team_id) {
          arr[index] = { ...group, subscribed: !group.subscribed };
        }
      });
    },
    subscribeGroupRequestFailed: (groups, action) => {
      const { team_id } = action.payload;
      groups["allGroups"]["list"].forEach((group, index, arr) => {
        if (group.id == team_id) {
          arr[index] = { ...group, subscribed: !group.subscribed };
        }
      });
    },
    subscribeGroupListModified: (groups, action) => {
      groups["allGroups"]["lastModified"] = Date.now();
    },
  },
});

export const {
  groupsLoaderUpdated,
  groupsReceived,
  groupCreated,
  groupUpdated,
  groupDestroyed,
  groupDetailReceived,
  groupMemberReceived,
  groupMemberRemoved,
  subscribeGroupRequested,
  subscribeGroupRequestFailed,
  subscribeGroupListModified,
  cacheStateResetted,
} = slice.actions;
export default slice.reducer;

// dispatch
export const loadGroups =
  ({ name, url }) =>
  (dispatch, getState) => {
    const { lastFetch } =
      getState().entities.leaveTracker.employeeAccountData.groups[name];
    if (!cachingTimeExpired(lastFetch)) return;
    return dispatch(
      apiCallBegan({
        requestParams: { url },
        onStart: groupsLoaderUpdated({ loading: true, name }),
        onSuccess: groupsReceived({ name }),
        onEnd: groupsLoaderUpdated({ loading: false, name }),
      })
    );
  };

export const loadGroupDetail =
  ({ baseUrl, id }) =>
  (dispatch, geState) => {
    const url = baseUrl + id;
    return dispatch(
      apiCallBegan({
        requestParams: { url },
        onStart: groupsLoaderUpdated({ loading: true, name: "detail" }),
        onEnd: groupsLoaderUpdated({ loading: false, name: "detail" }),
        onSuccess: groupDetailReceived(),
      })
    );
  };

export const createGroup =
  ({ url, data }) =>
  (dispatch, getstate) => {
    return dispatch(
      apiCallBegan({
        requestParams: { url, data, method: "post" },
        onStart: groupsLoaderUpdated({ loading: true, name: "myGroups" }),
        onEnd: groupsLoaderUpdated({ loading: false, name: "myGroups" }),
        onSuccess: groupCreated(),
      })
    );
  };
export const updateGroupInfo =
  ({ baseUrl, id, data }) =>
  (dispatch, getstate) => {
    const url = baseUrl + id + "/";
    return dispatch(
      apiCallBegan({
        requestParams: { url, data, method: "patch" },
        onStart: groupsLoaderUpdated({ loading: true, name: "myGroups" }),
        onEnd: groupsLoaderUpdated({ loading: false, name: "myGroups" }),
        onSuccess: groupUpdated(),
      })
    );
  };
export const deleteGroup =
  ({ baseUrl, id }) =>
  (dispatch, getstate) => {
    const url = baseUrl + id;
    return dispatch(
      apiCallBegan({
        requestParams: { url, method: "delete" },
        onStart: groupsLoaderUpdated({ loading: true, name: "myGroups" }),
        onEnd: groupsLoaderUpdated({ loading: false, name: "myGroups" }),
        onSuccess: groupDestroyed({ id }),
      })
    );
  };
export const loadGroupMembers =
  ({ baseUrl, groupId }) =>
  (dispatch) => {
    const url = baseUrl + groupId + "/" + "member/";
    return dispatch(
      apiCallBegan({
        requestParams: { url },
        onSuccess: groupMemberReceived(),
      })
    );
  };
export const addGroupMembers =
  ({ url, data }) =>
  (dispatch, getstate) => {
    return dispatch(
      apiCallBegan({
        requestParams: { url, data, method: "post" },
        onStart: groupsLoaderUpdated({ loading: true, name: "myGroups" }),
        onEnd: groupsLoaderUpdated({ loading: false, name: "myGroups" }),
        onSuccess: groupUpdated(),
      })
    );
  };
export const updateGroupMember =
  ({ baseUrl, memberId, groupId, data }) =>
  (dispatch) => {
    const url = baseUrl + groupId + "/" + "member/" + memberId + "/";
    return dispatch(
      apiCallBegan({
        requestParams: { url, method: "patch", data },
        onStart: groupsLoaderUpdated({ loading: true, name: "myGroups" }),
        onEnd: groupsLoaderUpdated({ loading: false, name: "myGroups" }),
      })
    );
  };
export const removeGroupMember =
  ({ baseUrl, memberId, groupId }) =>
  (dispatch) => {
    const url = baseUrl + groupId + "/" + "member/" + memberId + "/";
    return dispatch(
      apiCallBegan({
        requestParams: { url, method: "delete" },
        onStart: groupsLoaderUpdated({ loading: true, name: "myGroups" }),
        onSuccess: groupMemberRemoved({ groupId }),
        onEnd: groupsLoaderUpdated({ loading: false, name: "myGroups" }),
      })
    );
  };

export const subscribeGroup =
  ({ url, id, data }) =>
  (dispatch, getState) => {
    const allGroupList =
      getState().entities.leaveTracker.employeeAccountData.groups.allGroups
        .list;
    const selectedGroup = allGroupList.filter((group) => group.id == id)[0];
    if (!selectedGroup) return;
    const requestUrl = `${url}${id}/${
      selectedGroup.subscribed ? "unsubscribe" : "subscribe"
    }/`;
    return dispatch(
      apiCallBegan({
        requestParams: { url: requestUrl, method: "post", data },
        onStart: subscribeGroupRequested({ team_id: id }),
        onSuccess: subscribeGroupListModified(),
        onError: subscribeGroupRequestFailed({ team_id: id }),
      })
    );
  };
// getState

export const sliceMyGroupList = createSelector(
  (state) => state.entities.groups.myGroups,
  (myGroups) => myGroups.list
);

export const sliceAllGroupList = createSelector(
  (state) => state.entities.groups.allGroups,
  (allGroups) => allGroups.list
);

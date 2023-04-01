import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../../../store/apiActions';
import { cachingTimeExpired } from '../../../utilities/helper';
import { REQUEST_URL } from '../apiConstants';

const initialState = {
  myLeaves: {
    isLoading: false,
    lastFetch: '',
    lastModified: '',
    upcoming: {
      list: []
    },
    previous: {
      list: []
    }
  },
  leaveApproverStatus: {
    isLoading: false,
    data: {}
  }
};

const slice = createSlice({
  name: 'leaves',
  initialState: { ...initialState },
  reducers: {
    loaderUpdated: (leaves, action) => {
      const { sectionName, loading } = action.payload;
      leaves[sectionName].isLoading = loading;
    },
    myLeavesLoaderUpdated: (leaves, action) => {
      leaves.myLeaves.isLoading = action.payload.loading;
    },
    myLeavesReceived: (leaves, action) => {
      const { data, sectionNames } = action.payload;
      if (Array.isArray(data) && Array.isArray(sectionNames)) {
        sectionNames.forEach((name, index) => {
          leaves.myLeaves[name].list = data[index];
        });
      }
      leaves.myLeaves.lastFetch = Date.now();
      leaves.myLeaves.lastModified = '';
      leaves.leaveApproverStatus = { ...initialState.leaveApproverStatus };
    },
    leaveApproverStatusReceived: (leaves, action) => {
      const { data, id } = action.payload;
      leaves.leaveApproverStatus.data = { ...leaves.leaveApproverStatus.data, [id]: data };
    },
    leaveRequestCreated: (leaves, action) => {
      const { data } = action.payload;
      leaves.myLeaves.upcoming.list.push(data);
      leaves.myLeaves.lastModified = Date.now();
    },
    leaveRequestDestroyed: (leaves, action) => {
      const { id } = action.payload;
      leaves.myLeaves.upcoming.list = leaves.myLeaves.upcoming.list.filter(
        (leave) => `${leave.id}` !== `${id}`
      );
      leaves.myLeaves.lastModified = Date.now();
    }
  }
});
export const {
  myLeavesLoaderUpdated,
  loaderUpdated,
  myLeavesReceived,
  leaveApproverStatusReceived,
  leaveRequestCreated,
  leaveRequestDestroyed
} = slice.actions;
export default slice.reducer;

export const loadMyLeaves =
  ({ requestDetails }) =>
  (dispatch, getState) => {
    const { lastFetch } = getState().entities.leaveTracker.employeeAccountData.leaves.myLeaves;
    if (!cachingTimeExpired(lastFetch)) return null;

    const requestParams = requestDetails.map(({ name, ...others }) => ({
      ...others
    }));

    const sectionNames = requestDetails.map(({ name }) => name);

    return dispatch(
      apiCallBegan({
        requestParams,
        onStart: loaderUpdated({ sectionName: 'myLeaves', loading: true }),
        onSuccess: myLeavesReceived({ sectionNames }),
        onEnd: loaderUpdated({ sectionName: 'myLeaves', loading: false })
      })
    );
  };

export const loadLeaveApproverStatus =
  ({ id }) =>
  (dispatch) => {
    const url = `${REQUEST_URL}${id}/approval-status/`;
    return dispatch(
      apiCallBegan({
        requestParams: { url },
        onStart: loaderUpdated({ sectionName: 'leaveApproverStatus', loading: true }),
        onSuccess: leaveApproverStatusReceived({ id }),
        onEnd: loaderUpdated({ sectionName: 'leaveApproverStatus', loading: false })
      })
    );
  };

export const createLeaveRequest = (props) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      requestParams: { method: 'post', ...props },
      onSuccess: leaveRequestCreated()
    })
  );
};

export const deleteLeaveRequest =
  ({ id }) =>
  (dispatch) => {
    const url = `${REQUEST_URL}${id}/`;
    return dispatch(
      apiCallBegan({
        requestParams: { url, method: 'delete' },
        onSuccess: leaveRequestDestroyed({ id })
      })
    );
  };

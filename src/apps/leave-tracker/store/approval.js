import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../../../store/apiActions';
import { cachingTimeExpired } from '../../../utilities/helper';
import { APPROVAL_URL } from '../apiConstants';

const initialState = {
  isLoading: false,
  lastFetch: '',
  newApproval: {
    list: []
  },
  actionedApproval: {
    list: []
  },
  previousApproval: {
    list: []
  },
  approvalApproverStatus: {
    isLoading: false,
    data: {}
  }
};
const slice = createSlice({
  name: 'approval',
  initialState: { ...initialState },

  reducers: {
    loaderUpdated: (approval, action) => {
      const { sectionName, loading } = action.payload;
      if (sectionName) approval[sectionName].isLoading = loading;
      else approval.isLoading = loading;
    },
    approvalReceived: (approval, action) => {
      const { data, sectionNames } = action.payload;
      if (!(sectionNames && data)) return;
      if (Array.isArray(data) && Array.isArray(sectionNames)) {
        sectionNames.forEach((name, index) => {
          approval[name].list = data[index];
        });
        approval.lastFetch = Date.now();
        approval.approvalApproverStatus = { ...initialState.approvalApproverStatus };
      }
    },
    approvalUpdated: (approval, action) => {
      const { data, name } = action.payload;
      approval[name].list = approval[name].list.filter((i) => `${i.id}` !== `${data.id}`);
      approval.actionedApproval.list.push(data);
      const approverStatus = { ...approval.approvalApproverStatus.data };
      delete approverStatus[data.id];
      approval.approvalApproverStatus.data = approverStatus;
    },
    approvalApproverStatusReceived: (approval, action) => {
      const { data, id } = action.payload;
      approval.approvalApproverStatus.data = {
        ...approval.approvalApproverStatus.data,
        [id]: data
      };
    }
  }
});

export const { loaderUpdated, approvalApproverStatusReceived, approvalReceived, approvalUpdated } =
  slice.actions;
export default slice.reducer;

// dispatch

export const loadApprovalData = (requestDetails) => (dispatch, getState) => {
  const { lastFetch } = getState().entities.leaveTracker.employeeAccountData.approval;
  if (!cachingTimeExpired(lastFetch)) return null;
  const requestParams = requestDetails.map(({ name, ...others }) => ({
    ...others
  }));
  const sectionNames = requestDetails.map(({ name }) => name);
  return dispatch(
    apiCallBegan({
      requestParams,
      onStart: loaderUpdated({ loading: true }),
      onSuccess: approvalReceived({ sectionNames }),
      onEnd: loaderUpdated({ loading: false })
    })
  );
};

export const loadApprovalApproverStatus =
  ({ id }) =>
  (dispatch) => {
    const url = `${APPROVAL_URL}${id}/approval-status/`;
    return dispatch(
      apiCallBegan({
        requestParams: { url },
        onStart: loaderUpdated({ sectionName: 'approvalApproverStatus', loading: true }),
        onSuccess: approvalApproverStatusReceived({ id }),
        onEnd: loaderUpdated({ sectionName: 'approvalApproverStatus', loading: false })
      })
    );
  };
export const updateApproval =
  ({ baseUrl, name, id, data }) =>
  (dispatch) => {
    const url = `${baseUrl + id}/`;

    return dispatch(
      apiCallBegan({
        requestParams: { url, data, method: 'patch' },
        onStart: loaderUpdated({ loading: true }),
        onSuccess: approvalUpdated({ name }),
        onEnd: loaderUpdated({ loading: false })
      })
    );
  };

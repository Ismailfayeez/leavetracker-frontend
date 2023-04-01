import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '../../../store/apiActions';

const initialState = {
  reload: false,
  currentEmployee: {
    isLoading: false,
    employeeAdditionalInfoIsLoading: true,
    data: {
      id: '',
      email: '',
      username: '',
      role: {},
      domain: {},
      approvers: [],
      fyList: [],
      leaveBalance: []
    }
  }
};
const slice = createSlice({
  name: 'employeeProfile',
  initialState: {
    ...initialState
  },
  reducers: {
    employeeProfileReload: (employeeProfile) => {
      employeeProfile.reload = true;
    },
    employeeProfileRequested: (employeeProfile) => {
      employeeProfile.currentEmployee.isLoading = true;
    },
    employeeProfileRequestCompleted: (employeeProfile) => {
      employeeProfile.currentEmployee.isLoading = false;
    },
    employeeProfileReceived: (employeeProfile, action) => {
      const { data } = action.payload;
      employeeProfile.currentEmployee.data = {
        ...employeeProfile.currentEmployee.data,
        ...data
      };
    },
    employeeAdditionalInfoRequested: (employeeProfile) => {
      employeeProfile.currentEmployee.employeeAdditionalInfoIsLoading = true;
    },
    employeeAdditionalInfoCompleted: (employeeProfile) => {
      employeeProfile.currentEmployee.employeeAdditionalInfoIsLoading = false;
    },
    employeeAdditionalInfoReceived: (employeeProfile, action) => {
      const { data, sectionNames } = action.payload;

      if (Array.isArray(sectionNames)) {
        sectionNames.forEach((name, index) => {
          employeeProfile.currentEmployee.data = {
            ...employeeProfile.currentEmployee.data,
            [name]: data[index]
          };
        });
      }
    },

    newApproversReceived: (employeeProfile, action) => {
      const { data: newApprovers } = action.payload;
      employeeProfile.currentEmployee.data.approvers = [
        ...employeeProfile.currentEmployee.data.approvers,
        ...newApprovers
      ];
    },
    approverRemoved: (employeeProfile, action) => {
      const { id } = action.payload;
      const employeeData = employeeProfile.currentEmployee.data;
      const approvers = employeeData.approvers.filter((approver) => approver.id !== id);
      employeeProfile.currentEmployee.data = {
        ...employeeData,
        approvers
      };
    }
  }
});
export const {
  employeeProfileRequested,
  employeeProfileReceived,
  employeeProfileRequestCompleted,
  newApproversReceived,
  approverRemoved,
  accountsReceived,
  employeeAdditionalInfoRequested,
  employeeAdditionalInfoReceived,
  employeeAdditionalInfoCompleted
} = slice.actions;
export default slice.reducer;

export const loadCurrentEmployee = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      requestParams: { url: 'leavetracker/employee/me/' },
      onStart: employeeProfileRequested(),
      onSuccess: employeeProfileReceived(),
      onEnd: employeeProfileRequestCompleted()
    })
  );
};

export const loadEmployeeAdditionalInfo =
  ({ requestDetails }) =>
  (dispatch) => {
    const requestParams = requestDetails.map(({ name, ...others }) => ({
      ...others
    }));
    const sectionNames = requestDetails.map(({ name }) => name);
    return dispatch(
      apiCallBegan({
        requestParams,
        onStart: employeeAdditionalInfoRequested(),
        onSuccess: employeeAdditionalInfoReceived({ sectionNames }),
        onEnd: employeeAdditionalInfoCompleted()
      })
    );
  };

// accounts and session

// approvers
export const loadApprovers = (config) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      requestParams: { url: config.url.common },
      onSuccess: newApproversReceived()
    })
  );
};

export const addApprovers =
  ({ baseUrl, data }) =>
  (dispatch) => {
    const url = baseUrl;
    return dispatch(
      apiCallBegan({
        requestParams: {
          url,
          method: 'post',
          data
        },
        onSuccess: newApproversReceived()
      })
    );
  };

export const removeApprover =
  ({ baseUrl, id }) =>
  (dispatch) => {
    const url = baseUrl + id;
    return dispatch(
      apiCallBegan({
        requestParams: {
          url,
          method: 'delete'
        },
        onSuccess: approverRemoved({ id })
      })
    );
  };

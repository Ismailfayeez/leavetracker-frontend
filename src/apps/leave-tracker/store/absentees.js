import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../../../store/apiActions';

const initialState = {
  list: {
    isLoading: false,
    lastFetch: '',
    data: {}
  },
  absenteesCountByGroup: {
    data: {}
  },
  groupLevelAnalysis: {
    isLoading: {
      day: false,
      month: false,
      year: false
    },
    data: {}
  },
  cache: {
    allGroups: {
      lastFetch: '',
      lastModified: ''
    },
    myGroups: {
      lastFetch: '',
      lastModified: ''
    },
    myLeaves: {
      lastFetch: '',
      lastModified: ''
    }
  }
};
const slice = createSlice({
  name: 'absentees',
  initialState: { ...initialState },
  reducers: {
    absenteesReceived: (absentees, action) => {
      const { data, date } = action.payload;
      absentees.list = {
        ...absentees.list,
        lastFetch: Date.now(),
        data: { ...absentees.list.data, [date]: data }
      };
    },
    absenteesListLoaderUpdated: (absentees, action) => {
      absentees.list.isLoading = action.payload.loading;
    },
    absenteesListCleared: (absentees) => {
      absentees.list = { ...initialState.list };
    },

    absenteesCountByGroupReceived: (absentees, action) => {
      const { data, date } = action.payload;
      absentees.absenteesCountByGroup.data = {
        ...absentees.absenteesCountByGroup.data,
        [date]: data
      };
    },
    absenteesCountByGroupCleared: (absentees) => {
      absentees.absenteesCountByGroup.data = {};
    },
    groupLevelAnalysisLoaderUpdated: (absentees, action) => {
      const { sectionName, loading } = action.payload;
      absentees.groupLevelAnalysis.isLoading = {
        ...absentees.groupLevelAnalysis.isLoading,
        [sectionName]: loading
      };
    },
    groupLevelAnalysisUpdated: (absentees, action) => {
      const { data, groupId, recordName } = action.payload;
      absentees.groupLevelAnalysis.data[groupId] = {
        ...absentees.groupLevelAnalysis.data[groupId],
        [recordName]: data
      };
    },
    groupLevelAnalysisCleared: (absentees) => {
      absentees.groupLevelAnalysis = { ...initialState.groupLevelAnalysis };
    },
    cacheUpdated: (absentees, action) => {
      const { data, sectionName } = action.payload;
      absentees.cache[sectionName] = { ...data };
    }
  }
});

export const {
  absenteesReceived,
  absenteesListLoaderUpdated,
  absenteesListCleared,
  absenteesCountByGroupCleared,
  absenteesCountByGroupReceived,
  groupLevelAnalysisLoaderUpdated,
  groupLevelAnalysisUpdated,
  groupLevelAnalysisCleared,
  cacheUpdated
} = slice.actions;

export default slice.reducer;

// dispatch

export const loadAbsentees =
  ({ api, date }) =>
  (dispatch) => {
    const url = `${api}?date=${date}`;
    // const {lastFetch}=getState().entities.leaveTracker.absentees.list
    // if(!cachingTimeExpired(lastFetch)) return
    return dispatch(
      apiCallBegan({
        requestParams: { url },
        onStart: absenteesListLoaderUpdated({ loading: true }),
        onSuccess: absenteesReceived({ date }),
        onEnd: absenteesListLoaderUpdated({ loading: false })
      })
    );
  };

export const loadAbsenteesCountByGroup =
  ({ api, date }) =>
  (dispatch) => {
    const url = `${api}?date=${date}`;
    return dispatch(
      apiCallBegan({
        requestParams: { url },
        onSuccess: absenteesCountByGroupReceived({ date })
      })
    );
  };

export const loadAbsenteesGroupLevelAnalysis =
  ({ api, groupId, recordName, sectionName }) =>
  (dispatch) => {
    return dispatch(
      apiCallBegan({
        requestParams: { url: api },
        onStart: groupLevelAnalysisLoaderUpdated({
          loading: true,
          sectionName
        }),
        onSuccess: groupLevelAnalysisUpdated({
          groupId,
          recordName,
          sectionName
        }),
        onEnd: groupLevelAnalysisLoaderUpdated({
          loading: false,
          sectionName
        })
      })
    );
  };

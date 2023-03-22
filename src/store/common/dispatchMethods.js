import { apiCallBegan } from "../apiActions";

export const loadData = (url, responseType) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      requestParams: { url, responseType },
    })
  );
};
export const loadAllData = (requestParams) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      requestParams,
    })
  );
};

export const createRecord = (config, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: config.getCurrentUrl(),
      method: "post",
      data,
    })
  );
};

export const updateRecord = (config, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: config.getCurrentUrl(),
      method: "patch",
      data,
    })
  );
};
export const deleteRecord = (config) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: config.getCurrentUrl(),
      method: "delete",
    })
  );
};
export const createRecordNew = (url, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url,
      method: "post",
      data,
    })
  );
};

export const updateRecordNew = (url, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url,
      method: "patch",
      data,
    })
  );
};
export const deleteRecordNew = (url) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url,
      method: "delete",
    })
  );
};

export const closeRecordNew = (url, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url,
      method: "patch",
      data,
    })
  );
};

export const closeRecord = (config, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: config.getCurrentUrl(),
      method: "patch",
      data,
    })
  );
};

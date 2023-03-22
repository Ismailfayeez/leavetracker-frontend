import axios from "axios";
import { apiCallBegan, apiCallSuccess, apiCallFailure } from "../apiActions";
import httpService from "../../services/http/httpService";
import { apiErrorReceived } from "../error";
// import { decrementLoader, incrementLoader } from "../loader";
const http = httpService();
const api = (store) => (next) => async (action) => {
  const { dispatch } = store;

  if (action.type != apiCallBegan.type) return next(action);

  const { requestParams, onStart, onEnd, onSuccess, onError } = action.payload;
  let response = "";
  let responseData = "";
  const getRequestParams = (requestParam) => ({
    method: "get",
    ...requestParam,
  });

  try {
    if (onStart) dispatch(onStart);
    next(action);

    if (Array.isArray(requestParams)) {
      const requests = requestParams.map((requestParam) =>
        http.request(getRequestParams(requestParam))
      );
      response = await Promise.all(requests);
      responseData = response.map((r) => r.data);
    } else {
      response = await http.request(getRequestParams(requestParams));
      responseData = response.data;
    }

    // general
    dispatch(apiCallSuccess(response.data));

    if (onSuccess) {
      const { payload } = onSuccess;
      dispatch({
        ...onSuccess,
        payload: { ...payload, data: responseData },
      });
    }
    if (onEnd) dispatch(onEnd);
    return Promise.resolve(response);
  } catch (err) {
    console.log("error||||", err.response);
    const { status, data = {} } = err.response;
    dispatch(apiErrorReceived({ status, data }));

    if (onError) {
      dispatch({
        type: onError.type,
        payload: { ...onError.payload, status, data },
      });
    }

    if (onEnd) dispatch(onEnd);
    return Promise.reject(err);
  }
};
export default api;

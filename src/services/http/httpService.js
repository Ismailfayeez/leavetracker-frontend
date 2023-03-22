import axios from "axios";
const getAccessToken = () => {
  try {
    return localStorage.getItem("access");
  } catch (err) {
    return null;
  }
};
export default function httpService() {
  const { request } = axios;
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.defaults.headers.common["Authorization"] = getAccessToken()
    ? `JWT ${getAccessToken()}`
    : "";

  axios.interceptors.request.use(
    (success) => success,
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (success) => success,
    (error) => {
      if (error.response) {
        const { status } = error.response;
        if (status) {
          const expectedError = status < 500 && status >= 400;
          if (expectedError) {
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject({ response: { status: "unknown" } });
    }
  );

  return {
    request,
  };
}

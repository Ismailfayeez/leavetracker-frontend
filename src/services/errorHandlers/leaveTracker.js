import { apiErrorReceived } from "../../store/error";
function leaveTracker(history, error, store) {
  const { status, data } = error.response;
  if (status == 404 && data && data.code == "USER.SESSION.NOT.FOUND") {
    return history.replace("/switch-accounts");
  }

  if (data) {
    store.dispatch({
      type: apiErrorReceived.type,
      payload: { data },
    });
  }
  return Promise.reject(error);
}
export default leaveTracker;

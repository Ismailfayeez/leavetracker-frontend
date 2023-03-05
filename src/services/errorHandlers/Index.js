import leaveTracker from "./leaveTracker";
import project from "./project";

function errorHandlers(history, appBaseRoute, error, store) {
  if (error.response.status == 401) {
    store.dispatch();
  }
  if (appBaseRoute == "leavetracker")
    return leaveTracker(history, error, store);
  if (appBaseRoute == "project") return project(history, error, store);

  return Promise.reject(error);
}
export default errorHandlers;

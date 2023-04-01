import { logoutUser } from '../../../store/authActions';
import { handleLogout } from '../../../utilities/authMethods';

function AuthErrorHandler(errorResponse, navigate, dispatch) {
  if (errorResponse.status === 401) {
    if (
      errorResponse.data &&
      errorResponse.data.detail === 'No active account found with the given credentials'
    ) {
      return true;
    }

    handleLogout();
    dispatch(logoutUser());
    return true;
  }
}
export default AuthErrorHandler;

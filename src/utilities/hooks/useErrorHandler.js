import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthErrorHandler from '../../apps/auth/utilities/authErrorHandler';
import LTErrorHandler from '../../apps/leave-tracker/utilities/LTErrorHandler';
import projectErrorHandler from '../../apps/project/utilities/projectErrorHandler';
import { openErrorModal } from '../../store/error';

function useErrorHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.entities.error);
  const handleApiError = useCallback(() => {
    let handled = false;
    if (!handled) {
      handled = AuthErrorHandler(error.errorResponse, navigate, dispatch);
    }
    if (!handled) {
      handled = LTErrorHandler(error.errorResponse, navigate);
    }
    if (!handled) {
      handled = projectErrorHandler(error.errorResponse, navigate);
    }
    if (!handled) {
      dispatch(openErrorModal());
    }
  }, [error.errorResponse, navigate, dispatch]);
  useEffect(() => {
    if (error.errorResponse) {
      if (error.errorResponse.status === 'unknown') return navigate('/error', { replace: true });
      handleApiError();
    }
  }, [error.errorResponse, handleApiError, navigate]);
}

export default useErrorHandler;

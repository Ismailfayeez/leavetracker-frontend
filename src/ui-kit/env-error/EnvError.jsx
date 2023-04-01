import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { clearError } from '../../store/error';

function EnvError() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);
  return (
    <div>
      <h3>Something went wrong</h3>
      <p>Please contact administrator</p>
    </div>
  );
}

export default EnvError;

import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadCoreDataDetail, resetCoreDetail } from '../../store/projects';

function useProjectDetail(sectionConstants, sectionId) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { baseUrl, name, nestedUrlPathName } = sectionConstants;

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      if (sectionId === 'new') {
        setIsLoading(false);
        return;
      }
      await dispatch(loadCoreDataDetail({ baseUrl, name, nestedUrlPathName, id: sectionId }));
    } catch (err) {}
    setIsLoading(false);
  }, [dispatch, baseUrl, name, nestedUrlPathName, sectionId]);
  useEffect(() => {
    fetchData();
    return () => {
      dispatch(resetCoreDetail({ name }));
    };
  }, [dispatch, fetchData, name]);
  return [isLoading];
}

export default useProjectDetail;

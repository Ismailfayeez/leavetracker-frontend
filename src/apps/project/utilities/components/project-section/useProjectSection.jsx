import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadCoreDataList, resetCoreList } from '../../../store/projects';

export const useProjectSection = (sectionConstants) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, baseUrl, queryParamKey, nestedUrlPathName } = sectionConstants;
  const [searchQuery, setSearchQUery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const data = useSelector((state) => state.entities.projects.core[name]);
  const handleBack = () => navigate(-1);
  const fetchData = useCallback(
    // eslint-disable-next-line
    async function (queryVal) {
      if (queryVal) {
        try {
          setIsLoading(true);
          await dispatch(
            loadCoreDataList({
              baseUrl,
              name,
              nestedUrlPathName,
              queryParams: { [queryParamKey]: queryVal }
            })
          );
        } catch (err) {}
        setIsLoading(false);
      }
    },
    [baseUrl, dispatch, name, nestedUrlPathName, queryParamKey]
  );
  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery, fetchData]);

  useEffect(() => {
    return () => {
      dispatch(resetCoreList({ name }));
    };
  }, [dispatch, name]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value) {
        e.target.blur();
        setSearchQUery(e.target.value);
      }
    }
  };

  return [data, searchQuery, isLoading, handleSearch, handleBack];
};

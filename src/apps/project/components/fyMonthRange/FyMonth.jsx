import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadFyMonth } from '../../store/projects';
import { MY_PROJECTS_URL } from '../../apiConstants';
import LoadingScreen from '../../../../ui-kit/loading/loadingScreen/LoadingScreen';
import PageNavigation from '../utilities/page-navigation/PageNavigation';
import FyMonthRangeView from './FyMonthRangeView';
import FyMonthRangeEdit from './FyMonthRangeEdit';

function FyMonth() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const baseUrl = `${MY_PROJECTS_URL}${projectId}/fy-month/`;

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(loadFyMonth({ baseUrl }));
    } catch (err) {}
    setIsLoading(false);
  }, [dispatch, baseUrl]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const pages = [
    {
      name: 'view',
      component: <FyMonthRangeView />
    },
    {
      name: 'edit',
      component: <FyMonthRangeEdit />
    }
  ];

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="project-section-detail full-height">
      <PageNavigation pages={pages} defaultPage="view" />
    </div>
  );
}

export default FyMonth;

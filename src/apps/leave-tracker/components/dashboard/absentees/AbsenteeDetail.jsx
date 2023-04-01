import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import LoadingScreen from '../../../../../ui-kit/loading/loadingScreen/LoadingScreen';
import InfoDisplayList from '../../../../../ui-kit/info-display-list/InfoDisplayList';
import { loadData } from '../../../../../store/common/dispatchMethods';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import { leaveTrackerModalNames } from '../../../leaveTracker.constants';
import { ABSENTEES_URL } from '../../../apiConstants';
import './absentees.scss';

function AbsenteeDetail() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [{ globalVal }] = useModalNav(ModalNavContext);
  const { date, employeeId } = globalVal[leaveTrackerModalNames.absenteeDetail] || {};
  const columns = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
    {
      name: 'team_list',
      label: 'Groups',
      getBodyContent: useCallback((absentee) => {
        const { team_list: teamList = [] } = absentee;
        return <div>{teamList.join(', ')}</div>;
      }, [])
    },
    {
      name: 'upcoming_leaves',
      label: 'Upcoming Leaves',
      getBodyContent: useCallback((absentee) => {
        const { upcoming_leaves: upcomingLeaves = [] } = absentee;
        return upcomingLeaves.length > 0 ? (
          <div className="leave-dates__body">
            {upcomingLeaves.map((leave) => (
              <span
                key={leave}
                className="leave-dates__item badge badge--primary sub-text text-overflow--ellipsis">
                {leave}
              </span>
            ))}
          </div>
        ) : (
          'none'
        );
      }, [])
    }
  ];
  const fetchData = useCallback(async () => {
    const url = `${ABSENTEES_URL}?date=${date}&emp=${employeeId}`;
    try {
      const response = await dispatch(loadData(url));
      setData(response.data);
    } catch (err) {}
    setIsLoading(false);
  }, [dispatch, date, employeeId]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && (
        <InfoDisplayList data={[data]} columns={columns} className="flex flex--column gap--10px" />
      )}
    </>
  );
}

export default AbsenteeDetail;

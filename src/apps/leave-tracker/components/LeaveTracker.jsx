import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllData } from '../../../store/common/dispatchMethods';
import { ltCurrentProjectReceived } from '../../auth/store/userProfile';
import { ACCOUNT_PREFERENCE_URL } from '../apiConstants';
import { loadCurrentEmployee } from '../store/employeeProfile';
import LeaveTrackerMain from './LeaveTrackerMain';
import './leaveTracker.scss';

function LeaveTracker() {
  const dispatch = useDispatch();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const currentUserLTData = useSelector(
    (state) => state.entities.auth.userProfile.currentUser.data.leaveTracker
  );
  // const currentEmployeeData = useSelector(
  //   (state) => state.entities.leaveTracker.employeeAccountData.employeeProfile.currentEmployee.data
  // );
  const isCurrentProjectSelected =
    currentUserLTData.currentProject && currentUserLTData.currentProject.id;
  // const isEmployeeLoaded = currentEmployeeData.id;

  const fetchLeaveTrackerBaseData = useCallback(async () => {
    if (!isCurrentProjectSelected) {
      try {
        const response = await dispatch(loadAllData([{ url: ACCOUNT_PREFERENCE_URL }]));
        dispatch(ltCurrentProjectReceived({ data: response[0].data }));
      } catch (err) {}
    }
  }, [dispatch, isCurrentProjectSelected]);

  const fetchEmployee = useCallback(async () => {
    if (isCurrentProjectSelected) {
      setIsPageLoading(true);
      try {
        await dispatch(loadCurrentEmployee());
      } catch (err) {}
      setIsPageLoading(false);
    } else if (!isCurrentProjectSelected) {
    } else {
      setIsPageLoading(false);
    }
  }, [dispatch, isCurrentProjectSelected]);

  useEffect(() => {
    fetchLeaveTrackerBaseData();
  }, [fetchLeaveTrackerBaseData]);

  useEffect(() => {
    fetchEmployee();
  }, [currentUserLTData.currentProject, fetchEmployee]);

  return <LeaveTrackerMain isPageLoading={isPageLoading} />;
}

export default LeaveTracker;

import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import { leaveTrackerModalNames } from '../../../leaveTracker.constants';
import { loadLeaveApproverStatus } from '../../../store/status';
import ApproverLeaveStatus from '../../../utilities/components/approver-leave-status/ApproverLeaveStatus';

function LeaveApproverStatus() {
  const dispatch = useDispatch();
  const leaveApproverStatus = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.leaves.leaveApproverStatus
  );

  const { isLoading, data } = leaveApproverStatus;
  const [{ globalVal }] = useModalNav(ModalNavContext);
  const leaveApproverStatusProps = useMemo(
    () => globalVal[leaveTrackerModalNames.leaveApproverStatus] || {},
    [globalVal]
  );

  const fetchData = useCallback(async () => {
    if (data[leaveApproverStatusProps.id]) return null;
    dispatch(loadLeaveApproverStatus({ id: leaveApproverStatusProps.id }));
  }, [dispatch, leaveApproverStatusProps.id, data]);

  useEffect(() => {
    if (leaveApproverStatusProps.id) {
      fetchData();
    }
  }, [leaveApproverStatusProps.id, fetchData]);
  return <ApproverLeaveStatus isLoading={isLoading} data={data[leaveApproverStatusProps.id]} />;
}

export default LeaveApproverStatus;

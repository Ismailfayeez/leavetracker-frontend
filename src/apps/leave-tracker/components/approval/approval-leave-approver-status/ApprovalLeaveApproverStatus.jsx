import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import { leaveTrackerModalNames } from '../../../leaveTracker.constants';
import { loadApprovalApproverStatus } from '../../../store/approval';
import ApproverLeaveStatus from '../../../utilities/components/approver-leave-status/ApproverLeaveStatus';

function ApprovalLeaveApproverStatus() {
  const dispatch = useDispatch();
  const approvalApproverStatus = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.approval.approvalApproverStatus
  );
  const { isLoading, data } = approvalApproverStatus;
  const [{ globalVal }] = useModalNav(ModalNavContext);
  const approvalApproverStatusProps = useMemo(
    () => globalVal[leaveTrackerModalNames.approvalLeaveApproverStatus] || {},
    [globalVal]
  );
  const fetchData = useCallback(async () => {
    if (data[approvalApproverStatusProps.id]) return null;
    dispatch(loadApprovalApproverStatus({ id: approvalApproverStatusProps.id }));
  }, [dispatch, approvalApproverStatusProps.id, data]);

  useEffect(() => {
    if (approvalApproverStatusProps.id) {
      fetchData();
    }
  }, [approvalApproverStatusProps.id, fetchData]);
  return <ApproverLeaveStatus isLoading={isLoading} data={data[approvalApproverStatusProps.id]} />;
}

export default ApprovalLeaveApproverStatus;

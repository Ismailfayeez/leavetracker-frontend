import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadData } from "../../../../../store/common/dispatchMethods";
import { ModalNavContext } from "../../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../../utilities/hooks/useModalNav";
import { APPROVAL_URL } from "../../../apiConstants";
import { leaveTrackerModalNames } from "../../../leaveTracker.constants";
import ApproverLeaveStatus from "../../../utilities/components/approver-leave-status/ApproverLeaveStatus";

function ApprovalLeaveApproverStatus(props) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [{ globalVal }] = useModalNav(ModalNavContext);
  const data =
    globalVal[leaveTrackerModalNames.approvalLeaveApproverStatus] || {};
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await dispatch(
        loadData(APPROVAL_URL + `${data.id}/approval-status/`)
      );
      setStatus(response.data);
    } catch (err) {}
    setIsLoading(false);
  };
  useEffect(() => {
    if (data.id) {
      fetchData();
    }
  }, [data]);
  return <ApproverLeaveStatus isLoading={isLoading} data={status} />;
}

export default ApprovalLeaveApproverStatus;

import React from "react";
import InfoDisplayList from "../../../../../ui-kit/info-display-list/InfoDisplayList";
import { ModalNavContext } from "../../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../../utilities/hooks/useModalNav";
import { leaveTrackerModalNames } from "../../../leaveTracker.constants";
import tableColumns from "../../../utilities/tableColumns";
import "./leaveInfo.scss";
function LeaveInfo(props) {
  const { myLeaveInfo } = tableColumns;
  const [{ globalVal }] = useModalNav(ModalNavContext);
  const data = globalVal[leaveTrackerModalNames.leaveInfo];

  return (
    <div className="leave-info full-height">
      <InfoDisplayList
        data={[data.leave]}
        columns={myLeaveInfo}
        className="flex flex--column gap--1rem"
      />
    </div>
  );
}

export default LeaveInfo;

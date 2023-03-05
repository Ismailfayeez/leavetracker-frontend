import React, { useContext } from "react";
import Modal from "../../../ui-kit/modal/Modal";
import NotFound from "../../../ui-kit/not-found/NotFound";
import { leaveTrackerModalNames } from "../leaveTracker.constants";
import AddGroupMember from "./groups/add-group-members/AddGroupMember";
import AddNewGroup from "./groups/add-new-group/AddNewGroup";
import AddApprovers from "../components/others/approvers/AddApprovers";
import EditGroupInfo from "./groups/edit-group-info/EditGroupInfo";
import { useModalNav } from "../../../utilities/hooks/useModalNav";
import { ModalNavContext } from "../../../utilities/context/ModalNavContext";
import LeaveInfo from "./status/leave-info/LeaveInfo";
import LeaveApproverStatus from "./status/leave-approver-status/LeaveApproverStatus";
import ApprovalLeaveInfo from "./approval/approval-leave-info/ApprovalLeaveInfo";
import ApprovalLeaveApproverStatus from "./approval/approval-leave-approver-status/ApprovalLeaveApproverStatus";
import Request from "./requests/Request";
import RequestSuccess from "./requests/request-success/RequestSuccess";
import AbsenteeDetail from "./dashboard/absentees/AbsenteeDetail";
import LeaveBalanceTable from "./requests/leave-balance-table/LeaveBalanceTable";
import ConfirmationModalContent from "../../../ui-kit/confirmation-modal-content/ConfirmationModalContent";

function LeaveTrackerModalContent(props) {
  const [{ globalNav, globalVal, showModal, closeModal }] =
    useModalNav(ModalNavContext);
  const {
    addNewGroup,
    editGroupInfo,
    addGroupMembers,
    addApprovers,
    confirmation,
    leaveBalance,
    leaveInfo,
    leaveApproverStatus,
    approvalLeaveInfo,
    approvalLeaveApproverStatus,
    applyLeaveForm,
    requestSuccess,
    absenteeDetail,
  } = leaveTrackerModalNames;
  let children = "";
  let otherProps = {};
  switch (globalNav.currentNav) {
    //absentees
    case absenteeDetail:
      children = <AbsenteeDetail />;
      otherProps = { height: "md", width: "sm", title: "Absentee Info" };
      break;
    // leave request
    case applyLeaveForm:
      children = <Request />;
      otherProps = { height: "auto", width: "md", title: "Leave Request" };
      break;
    case requestSuccess:
      children = <RequestSuccess />;
      otherProps = { height: "sm", width: "md" };
      break;
    // leave status
    case leaveInfo:
      children = <LeaveInfo />;
      otherProps = { height: "md", width: "sm", title: "Leave Info" };
      break;
    case leaveApproverStatus:
      children = <LeaveApproverStatus />;
      otherProps = { height: "md", width: "sm", title: "Status" };
      break;
    //approval
    case approvalLeaveInfo:
      children = <ApprovalLeaveInfo />;
      otherProps = { height: "md", width: "sm", title: "Approval Info" };
      break;
    case approvalLeaveApproverStatus:
      children = <ApprovalLeaveApproverStatus />;
      otherProps = { height: "md", width: "sm", title: "Status" };
      break;
    // groups
    case addNewGroup:
      children = <AddNewGroup />;
      otherProps = { height: "md", width: "sm", title: "New Group" };
      break;
    case editGroupInfo:
      children = <EditGroupInfo />;
      otherProps = { height: "md", width: "sm", title: "Edit Group" };
      break;
    case addGroupMembers:
      children = <AddGroupMember />;
      otherProps = { height: "lg", width: "sm", title: "Add Members" };
      break;
    case addApprovers:
      children = <AddApprovers />;
      otherProps = { height: "lg", width: "sm", title: "Add Approvers" };
      break;
    case confirmation:
      children = <ConfirmationModalContent {...globalVal[confirmation]} />;
      otherProps = { height: "sm", width: "sm" };
      break;
    default:
      children = <NotFound />;
      break;
  }
  return (
    <>
      <Modal
        children={children}
        open={showModal}
        handleClose={() => closeModal()}
        {...otherProps}
      />
    </>
  );
}

export default LeaveTrackerModalContent;

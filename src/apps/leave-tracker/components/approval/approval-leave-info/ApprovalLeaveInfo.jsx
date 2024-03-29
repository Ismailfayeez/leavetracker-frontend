import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import { renderButton } from '../../../../../utilities/uiElements';
import {
  APPROVAL_ALLOWED_STATUS,
  APPROVAL_ALLOWED_TAB,
  leaveTrackerModalNames
} from '../../../leaveTracker.constants';
import { updateApproval } from '../../../store/approval';
import tableColumns from '../../../utilities/tableColumns';
import { APPROVAL_URL } from '../../../apiConstants';
import './approvalLeaveInfo.scss';
import ConfirmationModal from '../../../../../ui-kit/confirmation-modal/ConfirmationModal';

import InfoDisplayList from '../../../../../ui-kit/info-display-list/InfoDisplayList';

function ApprovalLeaveInfo() {
  const { approvalLeaveInfo } = tableColumns;
  const dispatch = useDispatch();
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [approverStatus, setApproverStatus] = useState('');
  const openDisplayConfirmationModal = () => setDisplayConfirmationModal(true);
  const closeDisplayConfirmationModal = () => setDisplayConfirmationModal(false);
  const [{ globalVal, closeModal }] = useModalNav(ModalNavContext);
  const data = globalVal[leaveTrackerModalNames.approvalLeaveInfo];
  const handleApproval = async (id, approverStatusList) => {
    try {
      await dispatch(
        updateApproval({
          name: data.name,
          baseUrl: APPROVAL_URL,
          id,
          data: { approver_status: approverStatusList }
        })
      );
      closeModal();
      toast.success(
        <span className="toast-msg">{`approval request  ${
          approverStatus === 'A' ? 'accepted' : 'rejected'
        } successfully`}</span>
      );
    } catch (err) {}
  };
  const isApprovalAllowed =
    APPROVAL_ALLOWED_STATUS.includes(data.leave.your_status_code) &&
    APPROVAL_ALLOWED_TAB.includes(data.name);
  return (
    <>
      <ConfirmationModal
        confirmationText={`Are you sure want to ${
          approverStatus === 'A' ? 'accept' : 'reject'
        } this request?`}
        handleConfirm={() => handleApproval(data.leave.id, approverStatus)}
        handleCancel={closeDisplayConfirmationModal}
        showModal={displayConfirmationModal}
        handleClose={closeDisplayConfirmationModal}
        height="sm"
        width="sm"
      />
      <div className="approval-leave-info flex flex--column full-height">
        <div className="flex-item-grow overflow--auto">
          <InfoDisplayList
            data={[data.leave]}
            columns={approvalLeaveInfo}
            className="flex flex--column gap--10px"
          />
        </div>

        {isApprovalAllowed && (
          <div className="btn-container-grow">
            {renderButton({
              content: 'accept',
              className: 'btn--md btn--brown',
              onClick: () => {
                setApproverStatus('A');
                openDisplayConfirmationModal();
              }
            })}
            {renderButton({
              content: 'reject',
              className: 'btn--md btn--matte-black',
              onClick: () => {
                setApproverStatus('R');
                openDisplayConfirmationModal();
              }
            })}{' '}
          </div>
        )}
      </div>
    </>
  );
}

export default ApprovalLeaveInfo;

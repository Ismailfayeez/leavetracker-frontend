import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { renderButton } from '../../../../../utilities/uiElements';
import GroupMembers from '../utilities/group-members/GroupMembers';
import { filterAdmin, filterParticipant } from '../utilities/utils';
import { leaveTrackerModalNames } from '../../../leaveTracker.constants';
import { deleteGroup } from '../../../store/groups';
import { MY_TEAM_URL } from '../../../apiConstants';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import InfoDisplayList from '../../../../../ui-kit/info-display-list/InfoDisplayList';
import './groupView.scss';

function GroupView(props) {
  const { handleRemoveMember, handleMakeAsAdmin, handleDismissAsAdmin } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groupsPathName, groupId } = useParams();
  const [
    {
      openModal,

      closeModal,

      moveToNextNav
    }
  ] = useModalNav(ModalNavContext);
  const { data } = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.groups.detail
  );
  const currentUserData = useSelector((state) => state.entities.auth.userProfile.currentUser.data);
  const adminList = filterAdmin(data.team_members);
  const memberList = filterParticipant(data.team_members);

  const isUserGroupAdmin = adminList.map((admin) => admin.email).includes(currentUserData.email);

  const handleOpenEditGroupInfo = () => {
    openModal();
    moveToNextNav({ groupId, groupsPathName }, leaveTrackerModalNames.editGroupInfo);
  };
  const handleOpenAddGroupMembers = () => {
    openModal();
    moveToNextNav({ groupId, groupsPathName }, leaveTrackerModalNames.addGroupMembers);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteGroup({ baseUrl: MY_TEAM_URL, id: groupId }));
      closeModal();
      navigate('/lt/groups', { replace: true });
      toast.success(<span className="toast-msg">group deleted successfully</span>);
    } catch (err) {}
  };

  const handleOpenDeleteConfirmation = () => {
    openModal();
    moveToNextNav(
      {
        confirmationText: 'Are you sure want to delete',
        handleConfirm: handleDelete,
        handleCancel: closeModal
      },
      leaveTrackerModalNames.confirmation
    );
  };

  return (
    <div className="group-view page-layout">
      <header className="flex flex-align--center page-layout__header">
        <div className="back-arrow">
          <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} />
        </div>
        <h4 className="info-label margin--0">{data.name}</h4>
      </header>
      <main className="page-layout__main">
        <InfoDisplayList
          data={[data]}
          columns={[
            { name: 'name', label: 'Name' },
            { name: 'description', label: 'Description' }
          ]}
          className="grid grid--1x2 grid--tablet gap--10px"
        />

        <div className="group-view__participants">
          <div className="content gap--10px">
            {data.team_members.length > 0 && (
              <GroupMembers
                title="Admin(s)"
                groupMembers={adminList}
                handleRemoveMember={handleRemoveMember}
                handleDismissAsAdmin={handleDismissAsAdmin}
              />
            )}
            {data.team_members.length > 0 && (
              <GroupMembers
                title="Member(s)"
                groupMembers={memberList}
                handleRemoveMember={handleRemoveMember}
                handleMakeAsAdmin={handleMakeAsAdmin}
              />
            )}
          </div>
        </div>
        <InfoDisplayList
          data={[
            {
              createdOn: '11 jan 2022',
              lastModifiedOn: '11 jan 2022',
              lastModifiedBy: 'fayeez'
            }
          ]}
          columns={[
            { name: 'createdOn', label: 'Created on' },
            { name: 'lastModifiedOn', label: 'Last Modified On' },
            { name: 'lastModifiedBy', label: 'Last Modified By' }
          ]}
          className="grid grid--1x2 grid--tablet gap--10px"
        />

        {isUserGroupAdmin && (
          <div className="flex flex--center btn-container flex-wrap ">
            {renderButton({
              onClick: handleOpenEditGroupInfo,
              content: 'Edit Group info',
              className: 'btn--md btn--matte-black'
            })}
            {renderButton({
              onClick: handleOpenAddGroupMembers,
              content: 'Add members',
              className: 'btn--md btn--matte-black'
            })}
            {renderButton({
              onClick: handleOpenDeleteConfirmation,
              content: 'Delete',
              className: 'btn--md btn--brown'
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default GroupView;

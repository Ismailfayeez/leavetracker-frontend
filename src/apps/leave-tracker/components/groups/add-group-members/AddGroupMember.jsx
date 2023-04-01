import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addGroupMembers, createGroup } from '../../../store/groups';
import { leaveTrackerModalNames, LEAVETRACKER_PATH_NAMES } from '../../../leaveTracker.constants';
import { MY_TEAM_URL } from '../../../apiConstants';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import AddUsers from '../../../utilities/components/add-users/AddUsers';

function AddGroupMember() {
  const dispatch = useDispatch();
  const [{ globalVal, closeModal }] = useModalNav(ModalNavContext);
  const {
    groupsPathName,
    groupId,
    groupInfoData = {}
  } = globalVal[leaveTrackerModalNames.addGroupMembers] || {};
  const { myGroups: myGroupsPathName } = LEAVETRACKER_PATH_NAMES;
  let baseUrl;
  if (groupsPathName === myGroupsPathName) baseUrl = MY_TEAM_URL;

  const groupDetail = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.groups.detail.data
  );
  const handleAddGroupMembers = async (teamMembers) => {
    try {
      if (groupId) {
        if (groupId === 'new') {
          const data = { ...groupInfoData, team_members: teamMembers };
          await dispatch(createGroup({ url: baseUrl, data }));
        } else {
          const url = `${baseUrl + groupId}/member/`;
          await dispatch(addGroupMembers({ url, data: teamMembers }));
        }
        closeModal();
        toast.success(
          <span className="toast-msg">
            {groupId === 'new' ? `new group added successfully` : `members added successfully`}
          </span>
        );
      }
    } catch (err) {}
  };
  return (
    <AddUsers
      title="Add members"
      existingMembers={groupDetail.team_members}
      handleSubmit={handleAddGroupMembers}
      onBack={() => {}}
    />
  );
}

export default AddGroupMember;

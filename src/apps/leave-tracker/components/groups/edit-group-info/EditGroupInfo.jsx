import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useValidator from '../../../../../utilities/hooks/useValidator';
import { updateGroupInfo } from '../../../store/groups';
import groupDetailsSchema from '../groupDetailsForm.schema';
import { MY_TEAM_URL } from '../../../apiConstants';
import { leaveTrackerModalNames, LEAVETRACKER_PATH_NAMES } from '../../../leaveTracker.constants';
import GroupInfoForm from '../utilities/group-info-form/GroupInfoForm';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import './editGroupInfo.scss';

function EditGroupInfo() {
  const dispatch = useDispatch();
  const [{ closeModal, globalVal }] = useModalNav(ModalNavContext);
  const { groupsPathName, groupId } = globalVal[leaveTrackerModalNames.editGroupInfo] || {};
  const { myGroups: myGroupsPathName } = LEAVETRACKER_PATH_NAMES;
  let baseUrl;
  if (groupsPathName === myGroupsPathName) baseUrl = MY_TEAM_URL;
  const groupDetail = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.groups.detail.data
  );
  const [data, setData] = useState(groupDetail);
  const [errors, validateForm, validateProperty] = useValidator(data, groupDetailsSchema);
  const handleData = ({ currentTarget: input }) => {
    setData((prevData) => ({ ...prevData, [input.name]: input.value }));
  };
  const handleBlur = ({ target: input }) => {
    validateProperty(input.name);
  };

  const handleUpdateGroupInfo = async () => {
    const error = validateForm();
    if (error) return;
    try {
      await dispatch(updateGroupInfo({ baseUrl, id: groupId, data }));
      closeModal();
      toast.success(<span className="toast-msg">group info updated successfully</span>);
    } catch (err) {}
  };

  return (
    <div className="edit-group-info">
      <GroupInfoForm
        handleChange={handleData}
        handleBlur={handleBlur}
        handleSubmit={handleUpdateGroupInfo}
        errors={errors}
        data={data}
      />
    </div>
  );
}

export default EditGroupInfo;

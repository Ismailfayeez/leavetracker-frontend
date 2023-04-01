import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useValidator from '../../../../../utilities/hooks/useValidator';
import groupDetailsSchema from '../groupDetailsForm.schema';
import GroupInfoForm from '../utilities/group-info-form/GroupInfoForm';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import { leaveTrackerModalNames, LEAVETRACKER_PATH_NAMES } from '../../../leaveTracker.constants';

function AddNewGroup() {
  const groupDetail = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.groups.detail.data
  );
  const [data, setData] = useState(groupDetail);
  const [errors, validateForm, validateProperty] = useValidator(data, groupDetailsSchema);
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);
  const handleData = ({ currentTarget: input }) => {
    setData((prevData) => ({ ...prevData, [input.name]: input.value }));
  };
  const handleBlur = ({ target: input }) => {
    validateProperty(input.name);
  };

  const handleNext = () => {
    const error = validateForm();
    if (error) return;
    openModal();
    moveToNextNav(
      {
        groupInfoData: data,
        groupId: 'new',
        groupsPathName: LEAVETRACKER_PATH_NAMES.myGroups
      },
      leaveTrackerModalNames.addGroupMembers
    );
  };
  return (
    <GroupInfoForm
      handleChange={handleData}
      handleBlur={handleBlur}
      handleSubmit={handleNext}
      errors={errors}
      data={data}
      id="new"
    />
  );
}

export default AddNewGroup;

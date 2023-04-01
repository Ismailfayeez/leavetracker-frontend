import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addApprovers } from '../../../store/employeeProfile';
import { APPROVER_URL } from '../../../apiConstants';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import AddUsers from '../../../utilities/components/add-users/AddUsers';

function AddApprovers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const approvers = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.employeeProfile.currentEmployee.data.approvers
  );
  const [{ closeModal }] = useModalNav(ModalNavContext);
  const handleSubmit = async (approverList) => {
    try {
      await dispatch(addApprovers({ baseUrl: APPROVER_URL, data: approverList }));
      closeModal();
      toast.success(<span className="toast-msg">Approvers updated successfully</span>);
    } catch (err) {}
  };

  return (
    <AddUsers
      onBack={() => {
        navigate(-1);
      }}
      handleSubmit={handleSubmit}
      existingMembers={approvers}
    />
  );
}

export default AddApprovers;

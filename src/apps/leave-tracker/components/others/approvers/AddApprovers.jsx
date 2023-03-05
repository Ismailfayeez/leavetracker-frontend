import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addApprovers } from "../../../store/employeeProfile";
import AddUsers from "../../utilities/add-users/AddUsers";
import { toast } from "react-toastify";
import { APPROVER_URL } from "../../../apiConstants";
import { ModalNavContext } from "../../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../../utilities/hooks/useModalNav";

function AddApprovers(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const approvers = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.employeeProfile
        .currentEmployee.data.approvers
  );
  const [{ closeModal }] = useModalNav(ModalNavContext);
  const handleSubmit = async (approvers) => {
    try {
      await dispatch(addApprovers({ baseUrl: APPROVER_URL, data: approvers }));
      closeModal();
      toast.success("Approvers updated successfully");
    } catch (err) {
      console.log(err);
    }
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

import React, { useEffect, useState } from "react";
import { deleteLeaveRequest, loadMyLeaves } from "../../store/status";
import { useDispatch, useSelector } from "react-redux";
import LeaveTable from "./LeaveTable";
import { LEAVE_BALANCE_URL, REQUEST_URL } from "../../apiConstants";
import { loadEmployeeAdditionalInfo } from "../../store/employeeProfile";
import "./status.scss";
import TabItems from "../../../../ui-kit/tab-items/TabItems";
import LoadingScreen from "../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import { leaveTrackerModalNames } from "../../leaveTracker.constants";
import { toast } from "react-toastify";
import AddButton from "../../../../ui-kit/button/add-button/AddButton";
import { motion as m } from "framer-motion";
import { pageVariant } from "../../../../utilities/AnimateVariants";

function Status(props) {
  const dispatch = useDispatch();
  const tabItems = [
    {
      name: "upcomingLeaves",
      label: "Active",
    },
    {
      name: "previousLeaves",
      label: "History",
    },
  ];
  const [{ moveToNextNav, openModal, closeModal }] =
    useModalNav(ModalNavContext);

  const [currentTab, setCurrentTab] = useState("upcomingLeaves");

  const myLeaves = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.leaves.myLeaves
  );
  const { isLoading } = myLeaves;
  const fetchData = async () => {
    try {
      await dispatch(
        loadMyLeaves({
          requestDetails: [
            {
              url: REQUEST_URL,
              name: "upcoming",
            },
            {
              url: REQUEST_URL + `?period=prev`,
              name: "previous",
            },
          ],
        })
      );
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteLeave = async (leave) => {
    console.log(leave);
    const { id, request_number } = leave;

    try {
      await dispatch(deleteLeaveRequest({ id }));

      await dispatch(
        loadEmployeeAdditionalInfo({
          requestDetails: [{ url: LEAVE_BALANCE_URL, name: "leaveBalance" }],
        })
      );
    } catch (err) {}
    closeModal();
    toast.success(
      <span className="toast-msg">{`leave ${request_number} deleted successfully`}</span>
    );
  };

  const getData = (name) => myLeaves[name]["list"];

  const handleDeleteConfirmationModal = (leave) => {
    openModal();
    moveToNextNav(
      {
        confirmationText: "Are you sure want to delete this record?",
        handleConfirm: () => handleDeleteLeave(leave),
        handleCancel: closeModal,
      },
      leaveTrackerModalNames.confirmation
    );
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <m.div
      className="leave-status page-layout"
      variants={pageVariant}
      initial="hidden"
      animate="visible"
    >
      <header className="page-layout__header flex flex--space-between-align-center">
        <h3 className="mb-0">My Leaves</h3>
        <AddButton
          content="Apply Leave"
          iconOnMobileScreen
          onClick={() => {
            openModal();
            moveToNextNav({}, leaveTrackerModalNames.applyLeaveForm);
          }}
        />
      </header>
      <main className="page-layout__main">
        <TabItems
          items={tabItems}
          currentTab={currentTab}
          handleClick={({ name }) => setCurrentTab(name)}
        />

        <article>
          {currentTab == "upcomingLeaves" && (
            <>
              <LeaveTable
                handleDelete={handleDeleteConfirmationModal}
                data={getData("upcoming")}
                enableDelete
              />
            </>
          )}
          {currentTab == "previousLeaves" && (
            <LeaveTable data={getData("previous")} />
          )}
        </article>
      </main>
    </m.div>
  );
}

export default Status;

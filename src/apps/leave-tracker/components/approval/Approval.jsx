import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadApprovalData } from "../../store/approval";
import { useState } from "react";
import ApprovalTable from "./ApprovalTable";
import TabItems from "../../../../ui-kit/tab-items/TabItems";
import {
  LEAVETRACKER_SECTION_LABELS,
  LEAVETRACKER_SECTION_NAMES,
} from "../../leaveTracker.constants";
import { APPROVAL_URL } from "../../apiConstants";
import LoadingScreen from "../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import { motion as m } from "framer-motion";
import { pageVariant } from "../../../../utilities/AnimateVariants";

function Approval(props) {
  const { newApproval, actionedApproval, previousApproval } =
    LEAVETRACKER_SECTION_NAMES;
  const {
    newApproval: newApprovalLabel,
    actionedApproval: actionedApprovalLabel,
    previousApproval: previousApprovalLabel,
  } = LEAVETRACKER_SECTION_LABELS;
  const dispatch = useDispatch();
  const approval = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.approval
  );
  const { isLoading } = approval;
  const [reload, setReload] = useState(true);
  const [currentTab, setCurrentTab] = useState("newApproval");
  const tabItems = [
    {
      name: "newApproval",
      label: newApprovalLabel,
    },
    {
      name: "actionedApproval",
      label: actionedApprovalLabel,
    },
    {
      name: "previousAppproval",
      label: previousApprovalLabel,
    },
  ];

  const fetchData = async () => {
    try {
      await dispatch(
        loadApprovalData([
          {
            name: newApproval,
            url: APPROVAL_URL + `?status=not-actioned`,
          },
          {
            name: actionedApproval,
            url: APPROVAL_URL + `?status=actioned`,
          },
          {
            name: previousApproval,
            url: APPROVAL_URL + `?status=not-actioned&period=prev`,
          },
        ])
      );
    } catch (err) {}
  };
  useEffect(() => {
    if (reload) {
      fetchData();
      setReload(false);
    }
  }, [reload]);

  const getData = (name) => approval[name]["list"];

  if (isLoading) return <LoadingScreen />;

  return (
    <m.div
      className="approval page-layout"
      variants={pageVariant}
      initial="hidden"
      animate="visible"
    >
      <header className="page-layout__header">
        <h3>Approvals</h3>
      </header>
      <main className="page-layout__main">
        <TabItems
          items={tabItems}
          currentTab={currentTab}
          handleClick={({ name }) => setCurrentTab(name)}
        />

        {currentTab == "newApproval" && (
          <ApprovalTable data={getData(newApproval)} name={newApproval} />
        )}
        {currentTab == "actionedApproval" && (
          <ApprovalTable
            data={getData(actionedApproval)}
            name={actionedApproval}
          />
        )}
        {currentTab == "previousAppproval" && (
          <ApprovalTable
            data={getData(previousApproval)}
            name={previousApproval}
          />
        )}
      </main>
    </m.div>
  );
}

export default Approval;

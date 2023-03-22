import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadCoreData } from "../store/core";
import { loadEmployeeAdditionalInfo } from "../store/employeeProfile";
import Dashboard from "./dashboard/Dashboard";
import Others from "./others/Others";
import Approval from "./approval/Approval";
import Request from "./requests/Request";
import Status from "./status/Status";
import Groups from "./groups/Groups";
import AddApprovers from "./others/approvers/AddApprovers";
import GroupDetail from "./groups/group-detail/GroupDetail";
import Announcements from "./announcements/Announcements";
import LeaveTrackerModalContent from "./LeaveTrackerModalContent";
import { ModalNavContext } from "../../../utilities/context/ModalNavContext";
import EmployeeCheckRoute from "../utilities/components/EmployeeCheckRoute";
import {
  CURRENT_FY_URL,
  FY_LIST_URL,
  LEAVE_BALANCE_URL,
  LEAVE_DURATION_URL,
  LEAVE_TYPE_URL,
} from "../apiConstants";
import { LEAVETRACKER_APP_PERMISSIONS } from "../leaveTracker.constants";
import "./leaveTracker.scss";

function LeaveTrackerMain({ isPageLoading }) {
  const dispatch = useDispatch();
  const { LEAVETRACKER_APP_PERMISSION_GRANT_ALL } =
    LEAVETRACKER_APP_PERMISSIONS;
  const currentEmployee = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.employeeProfile
        .currentEmployee
  );
  const currentEmployeeData = currentEmployee.data;
  const [globalVal, setGlobalVal] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [globalNav, setGlobalNav] = useState({
    prevNav: [],
    currentNav: "",
    nextNav: "",
  });
  const fetchEmployeeAdditionalData = async () => {
    if (currentEmployeeData.id) {
      try {
        await dispatch(
          loadCoreData({
            requestDetails: [
              { url: LEAVE_TYPE_URL, name: "leaveType" },
              { url: LEAVE_DURATION_URL, name: "leaveDuration" },
              { url: CURRENT_FY_URL, name: "currentFY" },
            ],
          })
        );
        await dispatch(
          loadEmployeeAdditionalInfo({
            requestDetails: [
              { url: FY_LIST_URL, name: "fyList" },
              { url: LEAVE_BALANCE_URL, name: "leaveBalance" },
            ],
          })
        );
      } catch (err) {}
    }
  };

  useEffect(() => {
    fetchEmployeeAdditionalData();
  }, [currentEmployeeData.id]);

  return (
    <div className="leavetracker app-main-display">
      <div className="full-height overflow--auto">
        <main className="app-main">
          <ModalNavContext.Provider
            value={{
              globalNav,
              setGlobalNav,
              globalVal,
              setGlobalVal,
              showModal,
              setShowModal,
            }}
          >
            <LeaveTrackerModalContent />
            <Routes>
              <Route
                path="dashboard"
                element={EmployeeCheckRoute({
                  component: Dashboard,
                  isPageLoading,
                  allowedAccess: LEAVETRACKER_APP_PERMISSION_GRANT_ALL,
                })}
              />
              <Route
                path="request"
                element={EmployeeCheckRoute({
                  component: Request,
                  isPageLoading,
                  allowedAccess: LEAVETRACKER_APP_PERMISSION_GRANT_ALL,
                })}
              />
              <Route
                path="approval"
                element={EmployeeCheckRoute({
                  component: Approval,
                  isPageLoading,
                  allowedAccess: LEAVETRACKER_APP_PERMISSION_GRANT_ALL,
                })}
              />
              <Route
                path="status"
                element={EmployeeCheckRoute({
                  component: Status,
                  isPageLoading,
                  allowedAccess: LEAVETRACKER_APP_PERMISSION_GRANT_ALL,
                })}
              />
              <Route
                path="groups/:groupsPathName/:groupId"
                element={EmployeeCheckRoute({
                  component: GroupDetail,
                  isPageLoading,
                  allowedAccess: LEAVETRACKER_APP_PERMISSION_GRANT_ALL,
                })}
              />
              <Route
                path="groups"
                element={EmployeeCheckRoute({
                  component: Groups,
                  isPageLoading,
                  allowedAccess: LEAVETRACKER_APP_PERMISSION_GRANT_ALL,
                })}
              />
              <Route
                path="announcements"
                element={EmployeeCheckRoute({
                  component: Announcements,
                  isPageLoading,
                  allowedAccess: LEAVETRACKER_APP_PERMISSION_GRANT_ALL,
                })}
              />
              <Route
                path="others/add-approver"
                element={EmployeeCheckRoute({
                  component: AddApprovers,
                  isPageLoading,
                  allowedAccess: LEAVETRACKER_APP_PERMISSION_GRANT_ALL,
                })}
              />
              <Route
                path="others"
                element={EmployeeCheckRoute({
                  component: Others,
                  isPageLoading,
                  allowedAccess: LEAVETRACKER_APP_PERMISSION_GRANT_ALL,
                })}
              />
              <Route
                path="*"
                element={<Navigate to="dashboard" replace={true} />}
              />
            </Routes>
          </ModalNavContext.Provider>
        </main>
      </div>
    </div>
  );
}

export default LeaveTrackerMain;

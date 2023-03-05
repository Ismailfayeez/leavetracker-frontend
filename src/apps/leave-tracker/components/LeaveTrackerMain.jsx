import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { loadCoreData } from "../store/core";
import { useDispatch, useSelector } from "react-redux";
import { loadEmployeeAdditionalInfo } from "../store/employeeProfile";
import Dashboard from "./dashboard/Dashboard";
import Others from "./others/Others";
import Approval from "./approval/Approval";
import Request from "./requests/Request";
import Status from "./status/Status";
import Groups from "./groups/Groups";
import AddApprovers from "./others/approvers/AddApprovers";
import "./leaveTracker.scss";
import GroupDetail from "./groups/group-detail/GroupDetail";
import {
  CURRENT_FY_URL,
  FY_LIST_URL,
  LEAVE_BALANCE_URL,
  LEAVE_DURATION_URL,
  LEAVE_TYPE_URL,
} from "../apiConstants";
import { LEAVETRACKER_APP_PERMISSION_GRANT_ALL } from "../leaveTracker.constants";
import LeaveTrackerModalContent from "./LeaveTrackerModalContent";
import { ModalNavContext } from "../../../utilities/context/ModalNavContext";
import EmployeeCheckRoute from "../utilities/components/EmployeeCheckRoute";

function LeaveTrackerMain({ isPageLoading }) {
  const dispatch = useDispatch();
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
  };

  useEffect(() => {
    if (currentEmployeeData.id) {
      fetchEmployeeAdditionalData();
    }
  }, [currentEmployeeData.id]);

  return (
    <div className="leavetracker app-content">
      <div className="app-content__display-area">
        <div className="app-content__body">
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
        </div>
      </div>
    </div>
  );
}

export default LeaveTrackerMain;

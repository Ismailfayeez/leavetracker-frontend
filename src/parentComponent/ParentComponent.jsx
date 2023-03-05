import React, { useState } from "react";
import {
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Auth from "../apps/auth/components/Index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentUser } from "../apps/auth/store/userProfile";
import PublicRoute from "../apps/auth/utilities/authentication/PublicRoute";
import { logoutUser } from "../store/authActions";
import NavBar from "../ui-kit/nav-bar/NavBar";
import LeaveTracker from "../apps/leave-tracker/components/LeaveTracker";
import "./parentComponent.scss";
import SideBarNav from "../ui-kit/side-bar-nav/SideBarNav";
import { appNavData } from "../utilities/app-nav-data/appNavData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/scss/global.scss";
import Accounts from "../apps/leave-tracker/components/accounts/Accounts";
import ApiErrorModal from "../ui-kit/api-error-modal/ApiErrorModal";
import PlayGround from "../playground/PlayGround";
import Project from "../apps/project/components/project/Project";
import { handleLogout } from "../utilities/authMethods";
import MyProfile from "../apps/auth/components/my-profile/MyProfile";
import UserMedia from "../ui-kit/user-media/UserMedia";
import { PROJECT_APP_PERMISSIONS } from "../apps/project/project.constants";
import { LEAVETRACKER_APP_PERMISSIONS } from "../apps/leave-tracker/leaveTracker.constants";
import EnvError from "../ui-kit/env-error/EnvError";
import ProtectedRoute from "../apps/auth/utilities/authentication/ProtectedRoute";
import useErrorHandler from "../utilities/hooks/useErrorHandler";
function ParentComponent(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { PROJECT_MAIN } = PROJECT_APP_PERMISSIONS;
  const { LEAVETRACKER_MAIN } = LEAVETRACKER_APP_PERMISSIONS;
  const [displayFloatingSidebar, setDisplayFloatingSideBar] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const currentUser = useSelector(
    (state) => state.entities.auth.userProfile.currentUser.data
  );
  const isAuthRoute = location.pathname.startsWith("/auth");
  useErrorHandler();

  const handleDisplayFloatingSideBar = () =>
    setDisplayFloatingSideBar(!displayFloatingSidebar);

  const fetchCurrentUserData = async () => {
    if (!isPageLoading) setIsPageLoading(true);
    try {
      await dispatch(loadCurrentUser());
    } catch (err) {}
    setIsPageLoading(false);
  };

  const handleLogoutUser = () => {
    handleLogout();
    dispatch(logoutUser());
    navigate("/auth/logout");
  };

  useEffect(() => {
    if (displayFloatingSidebar) {
      setDisplayFloatingSideBar(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  return (
    <div
      className={`parent-component page-layout ${isAuthRoute ? "bg-auth" : ""}`}
    >
      <ToastContainer />
      <ApiErrorModal />{" "}
      <header className="page-layout__header">
        <NavBar
          handleLogout={handleLogoutUser}
          handleDisplayFloatingSideBar={handleDisplayFloatingSideBar}
        />
      </header>
      <main className="page-layout__main flex overflow-auto">
        {currentUser.email && (
          <section className="sidebar-section">
            <div
              className={`floating-side-bar-overlay ${
                displayFloatingSidebar ? "" : "display-none"
              }`}
              onClick={handleDisplayFloatingSideBar}
            ></div>
            <div
              className={`floating-side-bar-container ${
                displayFloatingSidebar ? "" : "hide"
              }`}
            >
              <UserMedia />
              <SideBarNav appNavData={appNavData} />
            </div>
            <div className="side-bar-container">
              <SideBarNav appNavData={appNavData} />
            </div>
          </section>
        )}
        <div className="app-content-container flex-grow">
          <Routes>
            <Route
              path="auth/*"
              element={PublicRoute({ component: Auth, isPageLoading })}
            />
            <Route
              path="lt/*"
              element={ProtectedRoute({
                component: LeaveTracker,
                isPageLoading,
                allowedAccess: LEAVETRACKER_MAIN,
              })}
            />
            <Route
              path="project/*"
              element={ProtectedRoute({
                component: Project,
                isPageLoading,
                allowedAccess: PROJECT_MAIN,
              })}
            />
            <Route
              path="/my-profile"
              element={ProtectedRoute({
                component: MyProfile,
                isPageLoading,
                handleLogoutUser: handleLogoutUser,
              })}
            />
            <Route
              path="/switch-accounts"
              element={ProtectedRoute({
                component: Accounts,
                isPageLoading,
                allowedAccess: LEAVETRACKER_MAIN,
              })}
            />
            <Route path="/error" element={<EnvError />} />
            <Route path="*" element={<Navigate to="lt" />} />
          </Routes>
          <span className="access-denied"></span>
        </div>
      </main>
    </div>
  );
}

export default ParentComponent;

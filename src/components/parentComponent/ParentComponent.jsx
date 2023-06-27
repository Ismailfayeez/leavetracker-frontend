import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Auth from '../../apps/auth/components/Index';
import { loadCurrentUser } from '../../apps/auth/store/userProfile';
import PublicRoute from '../../apps/auth/utilities/authentication/PublicRoute';
import { logoutUser } from '../../store/authActions';
import NavBar from '../../ui-kit/nav-bar/NavBar';
import LeaveTracker from '../../apps/leave-tracker/components/LeaveTracker';
import Accounts from '../../apps/leave-tracker/components/accounts/Accounts';
import ApiErrorModal from '../../ui-kit/api-error-modal/ApiErrorModal';
import Project from '../../apps/project/components/project/Project';
import { handleLogout } from '../../utilities/authMethods';
import MyProfile from '../../apps/auth/components/my-profile/MyProfile';
import { PROJECT_APP_PERMISSIONS } from '../../apps/project/project.constants';
import { LEAVETRACKER_APP_PERMISSIONS } from '../../apps/leave-tracker/leaveTracker.constants';
import EnvError from '../../ui-kit/env-error/EnvError';
import ProtectedRoute from '../../apps/auth/utilities/authentication/ProtectedRoute';
import useErrorHandler from '../../utilities/hooks/useErrorHandler';
import FloatingSideBar from '../../ui-kit/floating-side-bar/FloatingSideBar';
import NavContent from '../nav-content/NavContent';
import '../../styles/scss/global.scss';
import './parentComponent.scss';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../../ui-kit/sidebar/SideBar';
import { menuSectionList } from '../../utilities/menu-sections/menuSectionList';

function ParentComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { PROJECT_MAIN } = PROJECT_APP_PERMISSIONS;
  const { LEAVETRACKER_MAIN } = LEAVETRACKER_APP_PERMISSIONS;
  const [displayFloatingSidebar, setDisplayFloatingSideBar] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const currentUser = useSelector((state) => state.entities.auth.userProfile.currentUser.data);
  const isUserLoggedIn = currentUser.email;
  const isAuthRoute = location.pathname.startsWith('/auth');
  const announcements = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.announcements.list.data
  );
  useErrorHandler();

  const handleDisplayFloatingSideBar = useCallback(
    () => setDisplayFloatingSideBar(!displayFloatingSidebar),
    [displayFloatingSidebar]
  );

  const fetchCurrentUserData = useCallback(async () => {
    setIsPageLoading(true);
    try {
      await dispatch(loadCurrentUser());
    } catch (err) {}
    setIsPageLoading(false);
  }, [dispatch]);

  const handleLogoutUser = () => {
    handleLogout();
    dispatch(logoutUser());
    navigate('/auth/logout');
  };

  useEffect(() => {
    setDisplayFloatingSideBar(false);
  }, [location.pathname]);

  useEffect(() => {
    fetchCurrentUserData();
  }, [fetchCurrentUserData]);
  const menuProps = {
    announcements: {
      new: announcements.some((announcement) => announcement.viewed_by === false)
    }
  };
  return (
    <div className={`parent-component  ${isAuthRoute ? 'bg-auth' : ''}`}>
      <ToastContainer />
      <ApiErrorModal />
      <header className="parent-component__header">
        <NavBar>
          <NavContent
            handleLogout={handleLogoutUser}
            handleDisplayFloatingSideBar={handleDisplayFloatingSideBar}
          />
        </NavBar>
      </header>
      <main className="parent-component__main flex overflow--auto">
        {isUserLoggedIn && (
          <section className="sidebar-section">
            <div className="display--mobile-tablet-hr-only">
              <FloatingSideBar
                displayFloatingSideBar={displayFloatingSidebar}
                setDisplayFloatingSideBar={setDisplayFloatingSideBar}
                menuSectionList={menuSectionList(menuProps)}
              />
            </div>
            <div className="display--desktop">
              <SideBar menuSectionList={menuSectionList(menuProps)} />
            </div>
          </section>
        )}
        <div className="app-main-container flex-item-grow">
          <Routes>
            <Route path="auth/*" element={PublicRoute({ component: Auth, isPageLoading })} />
            <Route
              path="lt/*"
              element={ProtectedRoute({
                component: LeaveTracker,
                isPageLoading,
                allowedAccess: LEAVETRACKER_MAIN
              })}
            />
            <Route
              path="project/*"
              element={ProtectedRoute({
                component: Project,
                isPageLoading,
                allowedAccess: PROJECT_MAIN
              })}
            />
            <Route
              path="/my-profile"
              element={ProtectedRoute({
                component: MyProfile,
                isPageLoading,
                handleLogoutUser
              })}
            />
            <Route
              path="/switch-accounts"
              element={ProtectedRoute({
                component: Accounts,
                isPageLoading,
                allowedAccess: LEAVETRACKER_MAIN
              })}
            />
            <Route path="/error" element={<EnvError />} />
            <Route path="*" element={<Navigate to="lt" />} />
          </Routes>
          <span className="access-denied" />
        </div>
      </main>
    </div>
  );
}

export default ParentComponent;

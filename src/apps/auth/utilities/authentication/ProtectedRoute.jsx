import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";
import AccessDenied from "../../../../ui-kit/AccessDenied";
import LoadingScreen from "../../../../ui-kit/loading/loadingScreen/LoadingScreen";

function ProtectedRoute({
  component: Component,
  isPageLoading,
  allowedAccess,
  ...others
}) {
  const location = useLocation();
  const currentUser = useSelector(
    (state) => state.entities.auth.userProfile.currentUser
  );
  const currentUserData = currentUser.data;

  if (currentUser.isLoading || isPageLoading) return <LoadingScreen />;
  if (!currentUserData.email)
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  if (allowedAccess) {
    if (currentUserData.access) {
      const userAccessList = currentUserData.access.map(
        (accessItem) => accessItem.code
      );
      if (userAccessList.includes(allowedAccess)) {
        return <Component {...others} />;
      }
    }
    return <AccessDenied />;
  }
  return <Component {...others} />;
}

export default ProtectedRoute;

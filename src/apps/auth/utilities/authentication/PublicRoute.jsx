import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../../../../ui-kit/loading/loadingScreen/LoadingScreen";

function PublicRoute({ component: Component, isPageLoading, ...others }) {
  const location = useLocation();
  const currentUser = useSelector(
    (state) => state.entities.auth.userProfile.currentUser
  );
  if (currentUser.isLoading || isPageLoading) return <LoadingScreen />;
  if (currentUser.data.email)
    return <Navigate to="/lt" state={{ from: location }} replace />;
  return <Component {...others} />;
}

export default PublicRoute;

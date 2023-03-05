import React from "react";
import AccessDenied from "../../../../ui-kit/AccessDenied";
import LoadingScreen from "../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import useEmployeePermission from "../hooks/useEmployeePermission";

function EmployeeCheckRoute({
  component: Component,
  isPageLoading,
  allowedAccess,
  ...others
}) {
  const { isLoading, isEmployee, isEmployeeHasPermission } =
    useEmployeePermission(allowedAccess);
  if (isLoading || isPageLoading) return <LoadingScreen />;
  if (isEmployee) {
    if (!allowedAccess || isEmployeeHasPermission)
      return <Component {...others} />;
  }
  console.log("employee loading");
  return <AccessDenied />;
}

export default EmployeeCheckRoute;

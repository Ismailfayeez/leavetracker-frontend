import AccessDenied from "../../ui-kit/AccessDenied";
import LoadingScreen from "../../ui-kit/loading/loadingScreen/LoadingScreen";

export const employeeWithRoleValidation = (
  Component,
  employeeData,
  allowedAccessList = []
) => {
  if (employeeData.isLoading) return <LoadingScreen />;
  if (employeeData.id) {
    if (employeeData.role && employeeData.role.access) {
      const employeeAccessList = employeeData.role.access.map(
        (accessObj) => accessObj.code
      );
      const accessGranted = allowedAccessList.every((accessId) =>
        employeeAccessList.includes(accessId)
      );
      if (accessGranted) return <Component />;
    }
  }
  return <AccessDenied />;
};

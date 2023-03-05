import { useSelector } from "react-redux";
function useEmployeePermission(...allowedAccess) {
  const currentEmployeeData = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.employeeProfile
        .currentEmployee.data
  );
  const isEmployee = currentEmployeeData.id;
  const getEmployeePermission = () => {
    if (
      isEmployee &&
      currentEmployeeData.role &&
      currentEmployeeData.role.access
    ) {
      const employeeAccessList = currentEmployeeData.role.access.map(
        (item) => item.code
      );
      if (allowedAccess.length == 1) {
        if (employeeAccessList.includes(allowedAccess[0])) {
          return true;
        }
      } else if (allowedAccess.length > 1) {
        const accessList = {};
        for (let access of allowedAccess) {
          if (employeeAccessList.includes(access)) {
            accessList[access] = true;
          } else {
            accessList[access] = false;
          }
        }
        return accessList;
      }
    }
    return false;
  };
  return {
    isEmployee,
    isEmployeeHasPermission: getEmployeePermission(),
    isLoading: currentEmployeeData.isLoading,
  };
}
export default useEmployeePermission;

import { useSelector } from "react-redux";
function useProjectMemberPermission(...allowedAccess) {
  const projectMember = useSelector(
    (state) => state.entities.projects.myProjects.projectMemberProfile
  );
  const isProjectMember = projectMember.id;
  const isProjectOwner = projectMember.owner && projectMember.owner.id;
  const isProjectAdmin = projectMember.admin && projectMember.admin.id;
  const getProjectAdminHasPermission = () => {
    if (
      projectMember.admin &&
      projectMember.admin.role &&
      projectMember.admin.role.access
    ) {
      const projectAdminAccessList = projectMember.admin.role.access.map(
        (item) => item.code
      );
      if (allowedAccess.length == 1) {
        if (projectAdminAccessList.includes(allowedAccess[0])) {
          return true;
        }
      } else if (allowedAccess.length > 1) {
        const accessList = {};
        for (let access of allowedAccess) {
          if (projectAdminAccessList.includes(access)) {
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
    isProjectMember,
    isProjectOwner,
    isProjectAdmin,
    isProjectAdminHasPermission: getProjectAdminHasPermission(),
  };
}
export default useProjectMemberPermission;

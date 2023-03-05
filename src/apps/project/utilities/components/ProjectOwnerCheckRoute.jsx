import React from "react";
import { useSelector } from "react-redux";
import AccessDenied from "../../../../ui-kit/AccessDenied";
import useProjectMemberPermission from "../../utilities/hooks/useProjectMemberPermission";

function ProjectOwnerCheckRoute({ component: Component, ...others }) {
  const { isProjectMember, isProjectOwner } = useProjectMemberPermission();
  if (isProjectMember && isProjectOwner) return <Component {...others} />;
  return <AccessDenied />;
}

export default ProjectOwnerCheckRoute;

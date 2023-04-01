import React from 'react';
import AccessDenied from '../../../../ui-kit/AccessDenied';
import LoadingScreen from '../../../../ui-kit/loading/loadingScreen/LoadingScreen';
import useProjectMemberPermission from '../hooks/useProjectMemberPermission';

function ProjectMemberCheckRoute({
  component: Component,
  allowedAccess,
  isLoading,
  ownerOnly,
  ...others
}) {
  const { isProjectMember, isProjectOwner, isProjectAdminHasPermission } =
    useProjectMemberPermission(allowedAccess);

  if (isLoading) return <LoadingScreen />;
  if (isProjectMember) {
    if (!allowedAccess || isProjectOwner || isProjectAdminHasPermission)
      return <Component {...others} />;
  }
  return <AccessDenied />;
}

export default ProjectMemberCheckRoute;

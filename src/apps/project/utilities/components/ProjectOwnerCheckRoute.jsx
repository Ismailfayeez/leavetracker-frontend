import React from 'react';
import AccessDenied from '../../../../ui-kit/AccessDenied';
import LoadingScreen from '../../../../ui-kit/loading/loadingScreen/LoadingScreen';
import useProjectMemberPermission from '../hooks/useProjectMemberPermission';

function ProjectOwnerCheckRoute({ component: Component, isLoading, ...others }) {
  const { isProjectMember, isProjectOwner } = useProjectMemberPermission();
  if (isLoading) return <LoadingScreen />;
  // eslint-disable-next-line react/jsx-props-no-spreading
  if (isProjectMember && isProjectOwner) return <Component {...others} />;
  return <AccessDenied />;
}

export default ProjectOwnerCheckRoute;
